import assert from "node:assert/strict";
import { test } from "@jest/globals";
import * as api from "../dist/index.js";

test("exports the complete public API", () => {
  assert.equal(typeof api.ClashOfClansClient, "function");
  assert.equal(typeof api.AuthenticationError, "function");
  assert.equal(typeof api.AuthorizationError, "function");
  assert.equal(typeof api.ClashOfClansAPIError, "function");
  assert.equal(typeof api.NetworkError, "function");
  assert.equal(typeof api.NotFoundError, "function");
  assert.equal(typeof api.RateLimitError, "function");
  assert.equal(typeof api.RequestAbortedError, "function");
  assert.equal(typeof api.RequestTimeoutError, "function");
  assert.equal(typeof api.ServerError, "function");
  assert.equal(typeof api.ValidationError, "function");
  assert.equal(typeof api.getAuthToken, "function");
  assert.equal(typeof api.getClient, "function");
  assert.equal(typeof api.setAuthToken, "function");
  assert.equal(typeof api.login, "function");
});

test("accepts a token and rejects invalid tags before HTTP", () => {
  const client = new api.ClashOfClansClient("test-token");
  assert.throws(
    () => client.players.get("not a tag"),
    (error) => error instanceof api.ValidationError
  );
});

test("rejects invalid client configuration", () => {
  assert.throws(() => new api.ClashOfClansClient(""), /token is required/);
  assert.throws(() => new api.ClashOfClansClient({ token: "token", timeout: 0 }), /timeout/);
});
