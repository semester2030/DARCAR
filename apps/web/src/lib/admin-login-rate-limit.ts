const MAX_FAILED_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const LOCK_MS = 15 * 60 * 1000;

type AttemptState = {
  failedCount: number;
  windowStartedAt: number;
  lockedUntil: number;
};

export type AdminLoginRateLimitStore = Map<string, AttemptState>;

export type AdminLoginRateLimitDecision =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

const defaultStore: AdminLoginRateLimitStore = new Map();

export function createAdminLoginRateLimitStore(): AdminLoginRateLimitStore {
  return new Map();
}

function retryAfterSeconds(lockedUntil: number, now: number): number {
  return Math.max(1, Math.ceil((lockedUntil - now) / 1000));
}

function normalizeKey(key: string): string {
  const trimmed = key.trim().toLowerCase();
  return trimmed || "unknown";
}

function activeState(
  store: AdminLoginRateLimitStore,
  key: string,
  now: number,
): AttemptState | undefined {
  const state = store.get(key);
  if (!state) return undefined;
  if (state.lockedUntil > now) return state;
  if (state.lockedUntil > 0 || now - state.windowStartedAt >= WINDOW_MS) {
    store.delete(key);
    return undefined;
  }
  return state;
}

export function checkAdminLoginRateLimitForKey(
  key: string,
  now = Date.now(),
  store = defaultStore,
): AdminLoginRateLimitDecision {
  const safeKey = normalizeKey(key);
  const state = activeState(store, safeKey, now);
  if (state?.lockedUntil && state.lockedUntil > now) {
    return { allowed: false, retryAfterSeconds: retryAfterSeconds(state.lockedUntil, now) };
  }
  return { allowed: true };
}

export function recordFailedAdminLoginForKey(
  key: string,
  now = Date.now(),
  store = defaultStore,
): AdminLoginRateLimitDecision {
  const safeKey = normalizeKey(key);
  const state = activeState(store, safeKey, now);
  if (state?.lockedUntil && state.lockedUntil > now) {
    return { allowed: false, retryAfterSeconds: retryAfterSeconds(state.lockedUntil, now) };
  }

  const failedCount = (state?.failedCount ?? 0) + 1;
  const nextState: AttemptState = {
    failedCount,
    windowStartedAt: state?.windowStartedAt ?? now,
    lockedUntil: failedCount >= MAX_FAILED_ATTEMPTS ? now + LOCK_MS : 0,
  };
  store.set(safeKey, nextState);

  if (nextState.lockedUntil > now) {
    return { allowed: false, retryAfterSeconds: retryAfterSeconds(nextState.lockedUntil, now) };
  }
  return { allowed: true };
}

export function clearAdminLoginFailuresForKey(
  key: string,
  store = defaultStore,
): void {
  store.delete(normalizeKey(key));
}

export function adminLoginRateLimitKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "unknown";
}

export function checkAdminLoginRateLimit(
  request: Request,
  now = Date.now(),
): AdminLoginRateLimitDecision {
  return checkAdminLoginRateLimitForKey(adminLoginRateLimitKey(request), now);
}

export function recordFailedAdminLogin(
  request: Request,
  now = Date.now(),
): AdminLoginRateLimitDecision {
  return recordFailedAdminLoginForKey(adminLoginRateLimitKey(request), now);
}

export function clearAdminLoginFailures(request: Request): void {
  clearAdminLoginFailuresForKey(adminLoginRateLimitKey(request));
}
