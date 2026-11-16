/**
 * La Cova del Drac — Google Workspace Contact Form Receiver (Apps Script)
 *
 * Attach this script to a Google Sheet inside your Google Workspace account
 * (Extensions -> Apps Script), set `CONTACT_WEBHOOK_SECRET` in Project Settings ->
 * Script Properties, and deploy as a Web App:
 *   - Execute as: Me (your Google Workspace account)
 *   - Who has access: Anyone
 *
 * Recipient email resolution order:
 *   1. `recipientEmail` passed by Cloudflare's `CONTACT_RECIPIENT_EMAIL` env var
 *   2. `CONTACT_RECIPIENT_EMAIL` in Apps Script Properties (if set)
 *   3. The Google Workspace account that deployed this script (`Session.getEffectiveUser()`)
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut({ ok: false, error: 'Empty payload' });
    }

    var data = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    var expectedSecret = props.getProperty('CONTACT_WEBHOOK_SECRET') || '';

    if (expectedSecret && data.secret !== expectedSecret) {
      return jsonOut({ ok: false, error: 'Unauthorized' });
    }

    var recipientEmail =
      (data.recipientEmail && String(data.recipientEmail).trim()) ||
      (props.getProperty('CONTACT_RECIPIENT_EMAIL') || '').trim() ||
      Session.getEffectiveUser().getEmail();

    // 1. Append inquiry to the active Google Sheet (creates header row on first run)
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

