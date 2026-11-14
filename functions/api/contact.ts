export interface ContactEnv {
  /** Deployed Google Apps Script Web App URL (https://script.google.com/macros/s/.../exec) */
  GOOGLE_SCRIPT_WEBHOOK_URL?: string;
  /** Configurable Google Workspace inbox that receives contact form entries */
  CONTACT_RECIPIENT_EMAIL?: string;
  /** Shared secret verified by the Google Apps Script */
  CONTACT_WEBHOOK_SECRET?: string;
  /** Optional comma-separated list of allowed origins in addition to covadeldrac.com & pages.dev */
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

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function isAllowedOrigin(originHeader: string | null, extraOrigins?: string): boolean {
  if (!originHeader) return true;
  try {
    const { hostname } = new URL(originHeader);
    if (
      hostname === 'covadeldrac.com' ||
      hostname === 'www.covadeldrac.com' ||
      hostname.endsWith('.pages.dev') ||
      hostname === 'localhost' ||
      hostname === '127.0.0.1'
    ) {
      return true;
    }
    if (extraOrigins) {
      const allowed = extraOrigins
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      return allowed.includes(originHeader.toLowerCase()) || allowed.includes(hostname.toLowerCase());
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

  if (!isAllowedOrigin(request.headers.get('Origin'), env.ALLOWED_ORIGINS)) {
    return jsonResponse({ ok: false, error: 'Forbidden origin' }, 403);
  }

  if (!env.GOOGLE_SCRIPT_WEBHOOK_URL) {
    return jsonResponse(
      { ok: false, error: 'Contact service is not configured yet' },
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
    const upstreamResponse = await fetch(env.GOOGLE_SCRIPT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
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

    if (!upstreamResponse.ok) {
      return jsonResponse({ ok: false, error: 'Upstream delivery failed' }, 502);
    }

    const upstreamResult = (await upstreamResponse.json().catch(() => ({ ok: true }))) as {
      ok?: boolean;
    };

    if (upstreamResult.ok === false) {
      return jsonResponse({ ok: false, error: 'Upstream rejected request' }, 502);
    }

    return jsonResponse({ ok: true });
  } catch {
    return jsonResponse({ ok: false, error: 'Upstream connection error' }, 502);
  }
};

