/**
 * La Cova del Drac — Google Workspace Contact Form Receiver (Apps Script)
 *
 * Attach this script to a Google Sheet inside your Google Workspace account
 * (Extensions -> Apps Script), set `CONTACT_WEBHOOK_SECRET` in Project Settings ->
 * Script Properties, run `authorizePermissions()` once in the editor to grant Sheet + Mail
 * permissions, and deploy as a Web App:
 *   - Execute as: Me (your Google Workspace account)
 *   - Who has access: Anyone
 *
 * Recipient email resolution order:
 *   1. `recipientEmail` passed by Cloudflare's `CONTACT_RECIPIENT_EMAIL` env var
 *   2. `CONTACT_RECIPIENT_EMAIL` in Apps Script Properties (if set)
 *   3. Effective Google Workspace user or active Google Sheet owner
 */

function cleanProp(val) {
  if (!val) return '';
  return String(val).trim().replace(/^['"]+|['"]+$/g, '').trim();
}

function resolveDefaultWorkspaceEmail(ss) {
  try {
    var effective = Session.getEffectiveUser().getEmail();
    if (effective) return effective.trim();
  } catch {
    // Ignore if userinfo.email scope is restricted
  }
  try {
    if (ss && ss.getOwner()) {
      var ownerEmail = ss.getOwner().getEmail();
      if (ownerEmail) return ownerEmail.trim();
    }
  } catch {
    // Ignore if owner lookup is unavailable
  }
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function authorizePermissions() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var quota = MailApp.getRemainingDailyQuota();
  Logger.log(
    'Permissions verified! Sheet: ' +
      (ss ? ss.getName() : 'none') +
      ', remaining daily email quota: ' +
      quota
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut({ ok: false, error: 'Empty payload' });
    }

    var data = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    var expectedSecret = cleanProp(props.getProperty('CONTACT_WEBHOOK_SECRET'));
    var providedSecret = cleanProp(data.secret);

    if (expectedSecret && providedSecret !== expectedSecret) {
      return jsonOut({
        ok: false,
        error: 'Unauthorized: CONTACT_WEBHOOK_SECRET mismatch between Cloudflare and Apps Script Properties',
      });
    }

    // 1. Append inquiry to the active Google Sheet first so no submission is ever lost
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      var sheet = ss.getSheets()[0];
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          'Data / Timestamp',
          'Idioma',
          'Nom',
          'Email',
          'Telèfon',
          'Modalitat',
          'Nivell',
          'Missatge',
        ]);
      }
      sheet.appendRow([
        data.submittedAt || new Date().toISOString(),
        data.locale || 'ca',
        data.name || '',
        data.email || '',
        data.phone || '',
        data.disciplineLabel || data.discipline || '',
        data.levelLabel || data.level || '',
        data.message || '',
      ]);
    }

    var recipientEmail =
      cleanProp(data.recipientEmail) ||
      cleanProp(props.getProperty('CONTACT_RECIPIENT_EMAIL')) ||
      resolveDefaultWorkspaceEmail(ss);

    if (!recipientEmail) {
      return jsonOut({
        ok: false,
        error:
          'No recipient email resolved. Set CONTACT_RECIPIENT_EMAIL in Cloudflare Pages or Apps Script Properties.',
      });
    }

    // 2. Send email notification to the Google Workspace inbox with Reply-To set to visitor
    var subject = '[La Cova del Drac] Nova consulta de ' + (data.name || 'Web');
    var plainBody = [
      'Nova consulta rebuda des del formulari de lacovadeldrac.com',
      '--------------------------------------------------------',
      'Nom: ' + (data.name || '-'),
      'Email: ' + (data.email || '-'),
      'Telèfon: ' + (data.phone || 'No indicat'),
      'Idioma del web: ' + String(data.locale || 'ca').toUpperCase(),
      'Modalitat: ' + (data.disciplineLabel || data.discipline || '-'),
      'Punt de partida: ' + (data.levelLabel || data.level || '-'),
      'Data: ' + (data.submittedAt || new Date().toISOString()),
      '',
      'Missatge:',
      data.message || '',
      '--------------------------------------------------------',
      'Pots respondre directament a aquest correu per contestar a ' + (data.email || 'la persona interessada') + '.',
    ].join('\n');

    MailApp.sendEmail({
      to: recipientEmail,
      replyTo: data.email,
      name: 'La Cova del Drac Web',
      subject: subject,
      body: plainBody,
    });

    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
