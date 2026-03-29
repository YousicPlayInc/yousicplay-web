/**
 * Simple in-memory rate limiter for API routes.
 * Resets per serverless instance — provides basic protection.
 * For production scale (100K+ users), upgrade to Upstash @upstash/ratelimit.
 */

const tokenBuckets = new Map<string, { tokens: number; lastRefill: number }>();

interface RateLimitConfig {
  maxTokens: number;      // max requests in window
  refillRate: number;     // tokens per second
  interval: number;       // refill check interval in ms
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxTokens: 10,
  refillRate: 1,
  interval: 1000,
};

export function rateLimit(
  identifier: string,
  config: Partial<RateLimitConfig> = {}
): { success: boolean; remaining: number } {
  const { maxTokens, refillRate, interval } = { ...DEFAULT_CONFIG, ...config };
  const now = Date.now();

  let bucket = tokenBuckets.get(identifier);
  if (!bucket) {
    bucket = { tokens: maxTokens, lastRefill: now };
    tokenBuckets.set(identifier, bucket);
  }

  // Refill tokens based on elapsed time
  const elapsed = now - bucket.lastRefill;
  const tokensToAdd = Math.floor(elapsed / interval) * refillRate;
  if (tokensToAdd > 0) {
    bucket.tokens = Math.min(maxTokens, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  if (bucket.tokens > 0) {
    bucket.tokens--;
    return { success: true, remaining: bucket.tokens };
  }

  return { success: false, remaining: 0 };
}

/**
 * Extract a rate limit identifier from a request.
 * Uses X-Forwarded-For (Vercel sets this), falls back to a generic key.
 */
export function getClientIP(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
