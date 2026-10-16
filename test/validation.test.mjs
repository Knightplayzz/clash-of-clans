import assert from "node:assert/strict";
import { test } from "@jest/globals";
import {
  normalizeCountryCode,
  normalizeTag,
  validateCountryCode,
  validateLeagueId,
  validateLimit,
  validateLocationId,
  validatePlayerToken,
  validateSeasonId
} from "../dist/utils/validation.js";
import {
  AuthenticationError,
  AuthorizationError,
  ClashOfClansAPIError,
  NetworkError,
  NotFoundError,
  RateLimitError,
  RequestAbortedError,
  RequestTimeoutError,
  ServerError,
  ValidationError
} from "../dist/errors.js";
import { getAuthToken, getClient, setAuthToken } from "../dist/auth/context.js";

test("validates tags, countries, IDs, seasons, and limits", () => {
  assert.equal(normalizeTag(" #P289 ", "player"), "P289");
  assert.equal(normalizeTag(" #2QG0 ", "clan"), "2QG0");
  assert.equal(normalizeCountryCode("BE"), "be");
  assert.doesNotThrow(() => validateCountryCode("global"));
  assert.doesNotThrow(() => validateLeagueId(1));
  assert.doesNotThrow(() => validateLocationId(0));
  assert.doesNotThrow(() => validateSeasonId("2024-09"));
  assert.doesNotThrow(() => validatePlayerToken("token"));
  assert.doesNotThrow(() => validateLimit(100));
  assert.throws(() => normalizeTag("", "player"), ValidationError);
  assert.throws(() => normalizeTag("#!", "player"), ValidationError);
  assert.throws(() => validateCountryCode("Belgium"), ValidationError);
  assert.throws(() => validateLeagueId(0), ValidationError);
  assert.throws(() => validateLocationId(-1), ValidationError);
  assert.throws(() => validateSeasonId(""), ValidationError);
  assert.throws(() => validatePlayerToken(""), ValidationError);
  assert.throws(() => validateLimit(101), ValidationError);
});

test("exposes error metadata and legacy context", () => {
  const base = new ClashOfClansAPIError("message", "/test", "POST", 400, { cause: "cause", retryable: true });
  assert.equal(base.statusCode, 400);
  assert.equal(base.method, "POST");
  assert.equal(base.retryable, true);
  assert.equal(base.cause, "cause");
  const legacy = new ClashOfClansAPIError("legacy", 500, "/legacy");
  assert.equal(legacy.endpoint, "/legacy");
  assert.equal(legacy.statusCode, 500);

  for (const error of [
    new AuthenticationError("/auth"),
    new AuthorizationError("/auth"),
    new NotFoundError("/missing"),
    new RateLimitError("/limited", 1000),
    new ServerError("/server", 500),
    new RequestTimeoutError("/timeout", 100),
    new NetworkError("/network"),
    new RequestAbortedError("/aborted"),
    new ValidationError("invalid")
  ]) {
    assert.ok(error instanceof ClashOfClansAPIError);
  }

  assert.throws(() => getAuthToken(), /not set/);
  assert.throws(() => getClient(), /not initialized/);
  assert.throws(() => setAuthToken(1), TypeError);
  setAuthToken("token");
  assert.equal(getAuthToken(), "token");
  assert.equal(getClient().constructor.name, "ClashOfClansClient");
});
