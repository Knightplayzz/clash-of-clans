import assert from "node:assert/strict";
import { jest, test } from "@jest/globals";

const fetchMock = jest.fn();
globalThis.fetch = fetchMock;

const { ClashOfClansClient } = await import("../dist/client.js");
const { AuthenticationError, NetworkError, RateLimitError, ServerError } = await import("../dist/errors.js");
const { login } = await import("../dist/auth/login.js");

function response(status = 200, body = { ok: true }, headers = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => JSON.stringify(body),
    headers: { get: (name) => headers[name.toLowerCase()] }
  };
}

test("requests all required endpoints and supports cache controls", async () => {
  fetchMock.mockResolvedValue(response());
  const client = new ClashOfClansClient({
    token: "token",
    cache: { enabled: true, ttl: 10_000, maxSize: 100 }
  });

  await Promise.all([
    client.clans.search({ name: "Knight", limit: 2 }),
    client.clans.get("#2QG0"),
    client.clans.getMembers("#2QG0", { limit: 2 }),
    client.clans.getCurrentWar("#2QG0"),
    client.clans.getWarLog("#2QG0", { limit: 2 }),
    client.clans.getCurrentWarLeagueGroup("#2QG0"),
    client.clans.getWarLeagueWar("#2QG0"),
    client.clans.getCapitalRaidSeasons("#2QG0", { limit: 2 }),
    client.players.get("#P2"),
    client.players.getBattlelog("#P2"),
    client.players.verifyToken("#P2", { token: "player-token" }),
    client.players.getLeagueHistory("#P2"),
    client.leagues.getLeagueTiers({ limit: 2 }),
    client.leagues.getLeagueTier(29000000),
    client.leagues.getLeagues({ limit: 2 }),
    client.leagues.getLeague(29000000),
    client.leagues.getLeagueSeasons(29000000, { limit: 2 }),
    client.leagues.getLeagueSeasonRankings(29000000, "2024-10", { limit: 2 }),
    client.leagues.getLeagueGroup("#2QG0", "2024-10"),
    client.leagues.getWarLeagues({ limit: 2 }),
    client.leagues.getWarLeague(48000000),
    client.leagues.getCapitalLeagues({ limit: 2 }),
    client.leagues.getCapitalLeague(85000000),
    client.leagues.getBuilderBaseLeagues({ limit: 2 }),
    client.leagues.getBuilderBaseLeague(44000000),
    client.locations.getLocations({ limit: 2 }),
    client.locations.getLocation(32000000),
    client.locations.getClanRankings(32000000, { limit: 2 }),
    client.locations.getPlayerRankings(32000000, { limit: 2 }),
    client.locations.getBuilderBasePlayerRankings(32000000, { limit: 2 }),
    client.locations.getBuilderBaseClanRankings(32000000, { limit: 2 }),
    client.locations.getCapitalRankings(32000000, { limit: 2 }),
    client.goldpass.getCurrentSeason(),
    client.labels.getPlayerLabels({ limit: 2 }),
    client.labels.getClanLabels({ limit: 2 })
  ]);

  const callsAfterResources = fetchMock.mock.calls.length;
  await client.players.get("#P2");
  assert.equal(fetchMock.mock.calls.length, callsAfterResources);
  await client.players.get("#P2", { useCache: false });
  client.clearCache();
  client.invalidateCache("GET:/players/%23P2");
  client.invalidateCache();
  assert.ok(fetchMock.mock.calls.length > callsAfterResources);
  assert.equal(fetchMock.mock.calls[0][1].headers.Authorization, "Bearer token");
  const verifyTokenCall = fetchMock.mock.calls.find(([url]) => url.endsWith("/players/%23P2/verifytoken"));
  assert.ok(verifyTokenCall);
  assert.equal(verifyTokenCall[1].method, "POST");
});

test("maps authentication, rate-limit, server, malformed, and network failures", async () => {
  const client = new ClashOfClansClient({ token: "token", retries: 0 });

  fetchMock.mockResolvedValueOnce(response(401));
  await assert.rejects(client.fetch("/auth"), AuthenticationError);

  fetchMock.mockResolvedValueOnce(response(403));
  await assert.rejects(client.fetch("/forbidden"));
  fetchMock.mockResolvedValueOnce(response(404));
  await assert.rejects(client.fetch("/missing"));
  fetchMock.mockResolvedValueOnce(response(400));
  await assert.rejects(client.fetch("/bad-request"));
  fetchMock.mockResolvedValueOnce(response(429, {}, { "retry-after": "0" }));
  await assert.rejects(client.fetch("/limited"), RateLimitError);

  fetchMock.mockResolvedValueOnce(response(500));
  await assert.rejects(client.fetch("/server"), ServerError);

  fetchMock.mockResolvedValueOnce({ ...response(), text: async () => "not-json" });
  await assert.rejects(client.fetch("/bad-json"));
  fetchMock.mockResolvedValueOnce({ ...response(), text: async () => "" });
  assert.deepEqual(await client.fetch("/empty"), {});
  fetchMock.mockResolvedValueOnce({ ...response(), text: async () => "[]" });
  await assert.rejects(client.fetch("/array"));
  fetchMock.mockResolvedValueOnce({ ...response(), text: async () => "null" });
  await assert.rejects(client.fetch("/null"));

  fetchMock.mockRejectedValueOnce(new Error("offline"));
  await assert.rejects(client.fetch("/offline"));
});

test("retries transient errors and validates request options", async () => {
  const client = new ClashOfClansClient({ token: "token", retries: 1 });
  fetchMock.mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce(response());
  assert.deepEqual(await client.fetch("/retry"), { ok: true });
  fetchMock.mockResolvedValueOnce(response(500)).mockResolvedValueOnce(response());
  assert.deepEqual(await client.fetch("/retry-server"), { ok: true });
  await assert.rejects(client.fetch("/bad", { retries: -1 }), /non-negative/);
  await assert.rejects(client.fetch("/bad", { timeout: 0 }), /positive/);
  assert.throws(() => client.fetch("/bad", { cacheSeconds: -1 }), /non-negative/);
});

test("validates cache configuration and login uses the shared client", async () => {
  assert.throws(() => new ClashOfClansClient({ token: "token", retries: -1 }), /non-negative/);
  assert.throws(() => new ClashOfClansClient({ token: "token", cache: { ttl: 0 } }), /cache.ttl/);
  assert.throws(() => new ClashOfClansClient({ token: "token", cache: { maxSize: 0 } }), /cache.maxSize/);
  fetchMock.mockResolvedValue(response());
  await login("login-token");
});

test("handles abort signals, cache eviction, and expired entries", async () => {
  fetchMock.mockResolvedValue(response());
  const client = new ClashOfClansClient({
    token: "token",
    cache: { enabled: true, ttl: 1, maxSize: 1 }
  });
  await client.fetch("/one");
  await new Promise((resolve) => setTimeout(resolve, 5));
  await client.fetch("/one");
  await client.fetch("/two");
  await client.labels.getPlayerLabels({ limit: 1 });
  client.invalidateCache("/labels/players");
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(client.fetch("/aborted", { signal: controller.signal }));
  const liveController = new AbortController();
  const pending = client.fetch("/pending", { signal: liveController.signal });
  liveController.abort();
  await assert.rejects(pending);
});

test("maps timeout and retry-after date responses", async () => {
  fetchMock.mockReset();
  const client = new ClashOfClansClient({ token: "token", retries: 0, timeout: 1 });
  fetchMock.mockImplementationOnce(
    (_, { signal }) =>
      new Promise((resolve, reject) => {
        signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
        setTimeout(() => resolve(response()), 10);
      })
  );
  await assert.rejects(client.fetch("/timeout"), /timed out/);
  const rateClient = new ClashOfClansClient({ token: "token", retries: 0, timeout: 1000 });
  fetchMock.mockResolvedValueOnce(response(429, {}, { "retry-after": "not-a-date" }));
  await assert.rejects(rateClient.fetch("/limited-date"), (error) => error instanceof RateLimitError);
  fetchMock.mockResolvedValueOnce(response(429, {}, { "retry-after": "Wed, 21 Oct 2015 07:28:00 GMT" }));
  await assert.rejects(rateClient.fetch("/limited-valid-date"), (error) => error instanceof RateLimitError);
  fetchMock.mockRejectedValueOnce(new NetworkError("/network"));
  await assert.rejects(rateClient.fetch("/typed-network"), NetworkError);
});
