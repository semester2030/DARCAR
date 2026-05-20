import assert from "node:assert/strict";
import test from "node:test";
import {
  checkAdminLoginRateLimitForKey,
  clearAdminLoginFailuresForKey,
  createAdminLoginRateLimitStore,
  recordFailedAdminLoginForKey,
} from "./admin-login-rate-limit";

test("locks a key after repeated failed admin logins", () => {
  const store = createAdminLoginRateLimitStore();
  const now = 1_000;

  for (let i = 0; i < 4; i += 1) {
    assert.deepEqual(recordFailedAdminLoginForKey("203.0.113.10", now + i, store), {
      allowed: true,
    });
  }

  const locked = recordFailedAdminLoginForKey("203.0.113.10", now + 4, store);
  assert.equal(locked.allowed, false);
  if (!locked.allowed) {
    assert.equal(locked.retryAfterSeconds, 900);
  }

  assert.equal(checkAdminLoginRateLimitForKey("203.0.113.10", now + 10, store).allowed, false);
});

test("clears failed admin login attempts after success", () => {
  const store = createAdminLoginRateLimitStore();
  const key = "203.0.113.11";

  recordFailedAdminLoginForKey(key, 1_000, store);
  recordFailedAdminLoginForKey(key, 1_001, store);
  clearAdminLoginFailuresForKey(key, store);

  assert.deepEqual(checkAdminLoginRateLimitForKey(key, 1_002, store), { allowed: true });
});

test("allows admin login attempts after the lock expires", () => {
  const store = createAdminLoginRateLimitStore();
  const key = "203.0.113.12";
  const now = 1_000;

  for (let i = 0; i < 5; i += 1) {
    recordFailedAdminLoginForKey(key, now + i, store);
  }

  assert.equal(checkAdminLoginRateLimitForKey(key, now + 10, store).allowed, false);
  assert.deepEqual(checkAdminLoginRateLimitForKey(key, now + 15 * 60 * 1000 + 5, store), {
    allowed: true,
  });
});
