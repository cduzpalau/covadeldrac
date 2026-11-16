export interface ContactEnv {
  /** Deployed Google Apps Script Web App URL (https://script.google.com/macros/s/.../exec) */
  GOOGLE_SCRIPT_WEBHOOK_URL?: string;
  /** Configurable Google Workspace inbox that receives contact form entries */
  CONTACT_RECIPIENT_EMAIL?: string;
  /** Shared secret verified by the Google Apps Script */
  CONTACT_WEBHOOK_SECRET?: string;
  /** Optional comma-separated list of allowed origins in addition to same-origin, lacovadeldrac.com & pages.dev */
  ALLOWED_ORIGINS?: string;
}

interface PagesEventContext<Env = ContactEnv> {
  request: Request;
  env: Env;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  discipline?: unknown;
  disciplineLabel?: unknown;
  level?: unknown;
  levelLabel?: unknown;
  message?: unknown;
  consent?: unknown;
  locale?: unknown;
  company_website?: unknown;
  elapsedMs?: unknown;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_HOSTNAMES = new Set([
  'lacovadeldrac.com',
  'www.lacovadeldrac.com',
  'covadeldrac.com',
  'www.covadeldrac.com',
  'localhost',
  '127.0.0.1',
]);

/**
 * Note: Avoid returning 502/503/504 from Cloudflare Pages Functions on custom domains,
 * because Cloudflare's zone edge intercepts 502/503/504 responses and replaces the JSON
 * body with its generic RFC 9457 `origin_bad_gateway` error payload. Using 400/403/422/500
 * preserves our diagnostic JSON payload in browser DevTools.
 */
function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function cleanEnvValue(value?: string): string {
  if (!value) return '';
  return value.trim().replace(/^['"]+|['"]+$/g, '').trim();
}

function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function extractHtmlErrorSnippet(html: string): string {
  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return withoutScripts.slice(0, 200);
}

function isAllowedOrigin(request: Request, extraOrigins?: string): boolean {
  const originHeader = request.headers.get('Origin');
  if (!originHeader) {
    const fetchSite = request.headers.get('Sec-Fetch-Site');
    if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) {
      return false;
    }
    return true;
  }

  try {
    const originUrl = new URL(originHeader);
    const requestUrl = new URL(request.url);

    // Always allow same-origin requests from whichever custom or preview domain serves this deployment
    if (originUrl.origin === requestUrl.origin) {
      return true;
    }

    const hostname = originUrl.hostname.toLowerCase();
    if (ALLOWED_HOSTNAMES.has(hostname) || hostname.endsWith('.pages.dev')) {
      return true;
    }

    if (extraOrigins) {
      const allowed = extraOrigins
        .split(',')
        .map((s) => cleanEnvValue(s).toLowerCase())
        .filter(Boolean);
      return allowed.includes(originUrl.origin.toLowerCase()) || allowed.includes(hostname);
    }

    return false;
  } catch {
    return false;
  }
}

export const onRequestPost = async (context: PagesEventContext): Promise<Response> => {
  const { request, env } = context;

  if (!isAllowedOrigin(request, env.ALLOWED_ORIGINS)) {
    return jsonResponse({ ok: false, code: 'FORBIDDEN_ORIGIN', error: 'Forbidden origin' }, 403);
  }

  const webhookUrl = cleanEnvValue(env.GOOGLE_SCRIPT_WEBHOOK_URL);
  if (!webhookUrl) {
    return jsonResponse(
      {
        ok: false,
        code: 'MISSING_WEBHOOK_URL',
        error: 'GOOGLE_SCRIPT_WEBHOOK_URL is not configured in Cloudflare Pages environment variables.',
      },
      500
    );
  }

  let parsedWebhookUrl: URL;
  try {
    parsedWebhookUrl = new URL(webhookUrl);
  } catch {
    return jsonResponse(
      {
        ok: false,
        code: 'INVALID_WEBHOOK_URL',
        error: 'GOOGLE_SCRIPT_WEBHOOK_URL is not a valid URL (check for typos or extra characters).',
      },
      500
    );
  }

  if (parsedWebhookUrl.pathname.endsWith('/dev')) {
    return jsonResponse(
      {
        ok: false,
        code: 'APPS_SCRIPT_DEV_URL',
        error:
          'GOOGLE_SCRIPT_WEBHOOK_URL points to /dev (test deployment). Use the /exec Web App URL from Deploy -> Manage deployments.',
      },
      500
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return jsonResponse({ ok: false, code: 'INVALID_JSON', error: 'Invalid JSON payload' }, 400);
  }

  // Honeypot & instant-submission bot filter: silently return 200 without forwarding spam
  const honeypot = cleanString(body.company_website, 200);
  const elapsedMs = typeof body.elapsedMs === 'number' ? body.elapsedMs : 5000;
  if (honeypot.length > 0 || elapsedMs < 1200) {
    return jsonResponse({ ok: true });
  }

  const name = cleanString(body.name, 120);
  const email = cleanString(body.email, 254);
  const phone = cleanString(body.phone, 40);
  const discipline = cleanString(body.discipline, 40);
  const disciplineLabel = cleanString(body.disciplineLabel, 80) || discipline;
  const level = cleanString(body.level, 40);
  const levelLabel = cleanString(body.levelLabel, 80) || level;
  const message = cleanString(body.message, 4000);
  const locale = cleanString(body.locale, 5) || 'ca';
  const consent = body.consent === true;

  if (name.length < 2 || !EMAIL_REGEX.test(email) || message.length < 5 || !consent) {
    return jsonResponse({ ok: false, code: 'VALIDATION_FAILED', error: 'Validation failed' }, 400);
  }

  const recipientEmail = cleanEnvValue(env.CONTACT_RECIPIENT_EMAIL).slice(0, 254);
  const webhookSecret = cleanEnvValue(env.CONTACT_WEBHOOK_SECRET);

  try {
    // Google Apps Script executes doPost() on the initial POST and responds with a 302
    // to either `script.googleusercontent.com/macros/echo?...` (when public) or
    // `accounts.google.com/...` (when "Who has access" is not set to "Anyone").
    let upstreamResponse = await fetch(parsedWebhookUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'manual',
      body: JSON.stringify({
        secret: webhookSecret,
        recipientEmail,
        submittedAt: new Date().toISOString(),
        locale,
        name,
        email,
        phone,
        discipline,
        disciplineLabel,
        level,
        levelLabel,
        message,
      }),
    });

    if (upstreamResponse.status >= 300 && upstreamResponse.status < 400) {
      const redirectLocation = upstreamResponse.headers.get('Location');
      if (redirectLocation) {
        const resolvedUrl = new URL(redirectLocation, parsedWebhookUrl.toString());
        if (resolvedUrl.hostname.includes('accounts.google.com')) {
          return jsonResponse(
            {
              ok: false,
              code: 'APPS_SCRIPT_AUTH_REQUIRED',
              error:
                'Google Apps Script redirected to Google Sign-In. Set Web App "Who has access" to "Anyone" (not "Anyone within organization" or "Only myself").',
            },
            500
          );
        }

        upstreamResponse = await fetch(resolvedUrl.toString(), {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          redirect: 'follow',
        });
      }
    }

    const finalUrl = upstreamResponse.url || '';
    if (finalUrl.includes('accounts.google.com')) {
      return jsonResponse(
        {
          ok: false,
          code: 'APPS_SCRIPT_AUTH_REQUIRED',
          error:
            'Google Apps Script redirected to Google Sign-In. Set Web App "Who has access" to "Anyone" (not "Anyone within organization" or "Only myself").',
        },
        500
      );
    }

    const responseText = await upstreamResponse.text();

    if (!upstreamResponse.ok) {
      return jsonResponse(
        {
          ok: false,
          code: 'UPSTREAM_HTTP_ERROR',
          upstreamStatus: upstreamResponse.status,
          error: `Google Apps Script returned HTTP ${upstreamResponse.status}`,
          detail: extractHtmlErrorSnippet(responseText),
        },
        500
      );
    }

    let upstreamResult: { ok?: boolean; error?: string };
    try {
      upstreamResult = JSON.parse(responseText) as { ok?: boolean; error?: string };
    } catch {
      return jsonResponse(
        {
          ok: false,
          code: 'UPSTREAM_NON_JSON',
          error:
            'Google Apps Script returned HTML instead of JSON. Check that Code.gs is saved, deployed as a New version, and "Who has access" is set to "Anyone".',
          detail: extractHtmlErrorSnippet(responseText),
        },
        500
      );
    }

    if (upstreamResult.ok === false) {
      return jsonResponse(
        {
          ok: false,
          code: 'UPSTREAM_REJECTED',
          error: upstreamResult.error || 'Google Apps Script rejected the request',
        },
        500
      );
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse(
      {
        ok: false,
        code: 'UPSTREAM_FETCH_ERROR',
        error: err instanceof Error ? err.message : 'Upstream connection error',
      },
      500
    );
  }
};
