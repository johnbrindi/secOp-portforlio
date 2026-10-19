// Fixed-window in-memory rate limiter. Each serverless instance keeps its own
// counters, so this is a speed bump against spam, not a hard guarantee.
// For strict limits across instances, swap in Upstash Redis or Vercel KV.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();

  // Opportunistic cleanup so the map can't grow without bound
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  return {
    ok: bucket.count <= max,
    retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
  };
}
