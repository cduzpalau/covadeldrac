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

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
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
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      return allowed.includes(originUrl.origin.toLowerCase()) || allowed.includes(hostname);
    }

    return false;
  } catch {
    return false;
  }
}

function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export const onRequestPost = async (context: PagesEventContext): Promise<Response> => {
  const { request, env } = context;

  if (!isAllowedOrigin(request, env.ALLOWED_ORIGINS)) {
    return jsonResponse({ ok: false, error: 'Forbidden origin' }, 403);
  }

  if (!env.GOOGLE_SCRIPT_WEBHOOK_URL) {
    return jsonResponse(
      { ok: false, error: 'Contact service is not configured yet (missing GOOGLE_SCRIPT_WEBHOOK_URL)' },
      503
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid JSON payload' }, 400);
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
    return jsonResponse({ ok: false, error: 'Validation failed' }, 400);
  }

  const recipientEmail = cleanString(env.CONTACT_RECIPIENT_EMAIL, 254);

  try {
    // Google Apps Script executes doPost() on the initial POST and responds with a 302
    // to a one-time echo URL (`script.googleusercontent.com/macros/echo?...`) expecting GET.
    let upstreamResponse = await fetch(env.GOOGLE_SCRIPT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'manual',
      body: JSON.stringify({
        secret: env.CONTACT_WEBHOOK_SECRET || '',
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
        const resolvedUrl = new URL(redirectLocation, env.GOOGLE_SCRIPT_WEBHOOK_URL).toString();
        upstreamResponse = await fetch(resolvedUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          redirect: 'follow',
        });
      }
    }

    if (!upstreamResponse.ok) {
      return jsonResponse(
        { ok: false, error: `Upstream delivery failed (HTTP ${upstreamResponse.status})` },
        502
      );
    }

    const responseText = await upstreamResponse.text();
    let upstreamResult: { ok?: boolean; error?: string };
    try {
      upstreamResult = JSON.parse(responseText) as { ok?: boolean; error?: string };
    } catch {
      return jsonResponse(
        {
          ok: false,
          error:
            'Upstream returned non-JSON response (verify Apps Script Web App access is set to "Anyone")',
        },
        502
      );
    }

    if (upstreamResult.ok === false) {
      return jsonResponse(
        { ok: false, error: upstreamResult.error || 'Upstream rejected request' },
        502
      );
    }

    return jsonResponse({ ok: true });
  } catch {
    return jsonResponse({ ok: false, error: 'Upstream connection error' }, 502);
  }
};
