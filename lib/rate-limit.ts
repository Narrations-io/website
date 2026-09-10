// In-memory, per-IP sliding-window rate limiter for the form/API routes.
// State lives in the Node process: on serverless it resets per instance and
// on cold starts, which is acceptable protection for a marketing site — the
// goal is stopping bursts and dumb scripts, not determined attackers.

type Window = { count: number; resetAt: number };

const buckets = new Map<string, Window>();

const MAX_BUCKETS = 10_000;

export function clientIp(req: Request): string {
  // Vercel/most proxies set x-forwarded-for; first hop is the client.
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();

  if (buckets.size > MAX_BUCKETS) {
    for (const [k, w] of buckets) {
      if (w.resetAt <= now) buckets.delete(k);
    }
    // Still oversized after pruning live windows → fail open rather than
    // letting the map grow without bound.
    if (buckets.size > MAX_BUCKETS) buckets.clear();
  }

  const w = buckets.get(key);
  if (!w || w.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  w.count += 1;
  return w.count <= limit;
}

export function tooMany() {
  return new Response(
    JSON.stringify({ ok: false, error: "Too many requests" }),
    { status: 429, headers: { "Content-Type": "application/json" } },
  );
}
