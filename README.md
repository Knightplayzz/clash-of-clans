<div align="center">
  <img src="https://1000logos.net/wp-content/uploads/2021/02/Clash-of-Clans-logo.png" height="200" alt="Clash of Clans logo">
  <br><br>
  <p><b>A lightweight, strongly typed Node.js wrapper for the official <a href="https://developer.clashofclans.com/">Clash of Clans API</a>.</b></p>

<a href="https://github.com/Knightplayzz/clash-of-clans/actions/workflows/ci.yml"><img src="https://github.com/Knightplayzz/clash-of-clans/actions/workflows/ci.yml/badge.svg" alt="Build Status"></a>
<a href='https://coveralls.io/github/Knightplayzz/clash-of-clans?branch=main'><img src='https://coveralls.io/repos/github/Knightplayzz/clash-of-clans/badge.svg?branch=main' alt='Coverage Status' /></a>
<a href="https://www.npmjs.com/package/clash-of-clans-node"><img src="https://img.shields.io/npm/dt/clash-of-clans-node.svg?maxAge=3600" alt="npm downloads"></a>

<a href="https://www.npmjs.com/package/clash-of-clans-node"><img src="https://img.shields.io/npm/v/clash-of-clans-node" alt="npm version"></a>
<a href="https://packagephobia.now.sh/result?p=clash-of-clans-node"><img src="https://badgen.net/packagephobia/install/clash-of-clans-node" alt="Current version"></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white" alt="TypeScript ready"></a>
</div>

---

> **Important:** This project is not affiliated with, endorsed, sponsored, or
> specifically approved by Supercell. Supercell is not responsible for this
> project. Please follow the [Supercell Fan Content Policy](https://supercell.com/en/fan-content-policy/).

## Contents

- [Overview](#overview)
- [Requirements and installation](#requirements-and-installation)
- [Getting an API token](#getting-an-api-token)
- [Quick start](#quick-start)
- [Configuration](#configuration)
- [How requests work](#how-requests-work)
- [Endpoint reference](#endpoint-reference)
- [Tags, IDs, and validation](#tags-ids-and-validation)
- [Pagination](#pagination)
- [Caching and request deduplication](#caching-and-request-deduplication)
- [Timeouts, retries, and cancellation](#timeouts-retries-and-cancellation)
- [Errors](#errors)
- [TypeScript and public exports](#typescript-and-public-exports)
- [Legacy authentication API](#legacy-authentication-api)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Limitations](#limitations)
- [License and attribution](#license-and-attribution)

## Overview

`clash-of-clans-node` provides an ESM client for the public Clash of Clans API.
It adds authentication headers, URL and query-string construction, input
validation, request pacing, retries, timeouts, optional in-memory caching, and
consistent errors.

It does **not** contain game data, scrape the game, bypass API restrictions, or
calculate gameplay results. Supercell's API controls availability, authorization,
rate limits, and response data.

## Requirements and installation

Node.js **22.0.0 or newer** is required.

```bash
npm install clash-of-clans-node
```

The package is ESM (`"type": "module"`) and includes JavaScript and TypeScript
declarations in `dist`. Use a normal ESM import:

```ts
import { ClashOfClansClient } from "clash-of-clans-node";
```

## Getting an API token

1. Open the [Clash of Clans Developer Portal](https://developer.clashofclans.com/).
2. Create or sign in to a developer account.
3. Create an API key for the public IP address of the environment that will
   make requests.
4. Store the key in an environment variable or secret manager.

For example, in PowerShell:

```powershell
$env:CLASH_OF_CLANS_API_TOKEN = "your-token"
```

The API key's IP restriction must match the machine making the request. Never
commit a token, put it in a URL, or print it in logs.

## Quick start

The following example loads the token from the environment, retrieves a clan,
and reads fields from the returned API object:

```ts
import { AuthenticationError, ClashOfClansAPIError, ClashOfClansClient } from "clash-of-clans-node";

const token = process.env.CLASH_OF_CLANS_API_TOKEN;
if (!token) {
  throw new Error("CLASH_OF_CLANS_API_TOKEN is not configured");
}

const client = new ClashOfClansClient({ token });

try {
  const clan = await client.clans.get("#2GLVC9GYV");
  console.log(`${clan.name} has ${clan.members} members`);
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error("The API token was rejected.");
  } else if (error instanceof ClashOfClansAPIError) {
    console.error(`Clash of Clans API request failed: ${error.message}`);
  } else {
    throw error;
  }
}
```

The response is typed as `Json` (`Record<string, unknown>`), so properties are
available as keys but the package does not model every game-specific response
field. The example is useful at runtime; in strict TypeScript code, narrow or
map fields from the generic response before treating them as a domain type.

## Configuration

### Client options

Pass either an API token string or a `ClashOfClansClientOptions` object. The
object form is recommended when configuring timeouts, retries, or caching.

| Option          | Type      | Default  | Description                                                                            |
| --------------- | --------- | -------- | -------------------------------------------------------------------------------------- |
| `token`         | `string`  | required | API key sent as a Bearer authentication token. It must be non-empty.                   |
| `timeout`       | `number`  | `10000`  | Per-attempt timeout in milliseconds. Must be a positive integer.                       |
| `retries`       | `number`  | `2`      | Additional attempts for retryable failures. Must be a non-negative integer.            |
| `cache.enabled` | `boolean` | `false`  | Enables caching for GET requests on this client instance.                              |
| `cache.ttl`     | `number`  | `180000` | Default cache lifetime in milliseconds. Must be positive.                              |
| `cache.maxSize` | `number`  | `100`    | Maximum number of cached entries. Must be positive. The oldest entry is evicted first. |

```ts
const client = new ClashOfClansClient({
  token,
  timeout: 15_000,
  retries: 3,
  cache: { enabled: true, ttl: 180_000, maxSize: 200 }
});
```

The constructor validates its numeric options immediately. Request options
override the corresponding client defaults for one call; they do not mutate
the client.

### Request options

`RequestOptions` is accepted by every endpoint. Paginated endpoints also
accept `before`, `after`, and `limit` through `PaginatedRequestOptions`.

| Option         | Type          | Description                                                                    |
| -------------- | ------------- | ------------------------------------------------------------------------------ |
| `timeout`      | `number`      | Per-attempt timeout in milliseconds.                                           |
| `retries`      | `number`      | Additional retry attempts for this request.                                    |
| `signal`       | `AbortSignal` | Aborts the caller's wait and the underlying fetch.                             |
| `useCache`     | `boolean`     | Enables or bypasses GET caching for this request.                              |
| `cacheSeconds` | `number`      | Request-specific cache lifetime in seconds. `0` prevents storing the response. |

`cacheSeconds` is only relevant when caching is used. A request with
`{ useCache: false }` always bypasses the cache.

## How requests work

For an endpoint call, the client:

1. Validates tags, IDs, seasons, and pagination values locally.
2. Builds a path under `https://api.clashofclans.com/v1`.
3. Normalizes tags by trimming whitespace, removing one leading `#`, converting
   to uppercase, and URL-encoding the `#` in the path.
4. Encodes query parameters with `URLSearchParams`.
5. Sends the API key as `Authorization: Bearer <token>` and requests JSON.
6. Parses a successful response as a JSON object. An empty response becomes `{}`;
   arrays, `null`, and malformed JSON are rejected.
7. Converts HTTP and transport failures into exported error classes.

GET requests are paced so that a client does not start requests less than
200 ms apart. This is client-side pacing, not a replacement for the official
API's rate limits. The wrapper does not automatically paginate, refresh tokens,
or alter API response objects.

## Endpoint reference

All methods return `Promise<Json>` except `players.verifyToken`, which returns
`Promise<VerifyPlayerTokenResponse>`. List endpoints return the API's list
object, normally containing `items` and optional `paging.cursors`.

### Clans and wars

| Method                                              | Purpose and arguments                                                                                                                                                                       | Path                                          |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `clans.search(options?)`                            | Searches clans. `name`, `warFrequency`, `locationId`, `minMembers`, `maxMembers`, `minClanPoints`, `minClanLevel`, and `labelIds` filter the search; pagination options are also supported. | `GET /clans`                                  |
| `clans.get(clanTag, options?)`                      | Retrieves one clan by tag.                                                                                                                                                                  | `GET /clans/{clanTag}`                        |
| `clans.getMembers(clanTag, options?)`               | Retrieves the clan member list. Paginated.                                                                                                                                                  | `GET /clans/{clanTag}/members`                |
| `clans.getCurrentWar(clanTag, options?)`            | Retrieves the clan's current war state as provided by the API.                                                                                                                              | `GET /clans/{clanTag}/currentwar`             |
| `clans.getWarLog(clanTag, options?)`                | Retrieves the clan's war history. Paginated.                                                                                                                                                | `GET /clans/{clanTag}/warlog`                 |
| `clans.getCurrentWarLeagueGroup(clanTag, options?)` | Retrieves the current Clan War League group.                                                                                                                                                | `GET /clans/{clanTag}/currentwar/leaguegroup` |
| `clans.getWarLeagueWar(warTag, options?)`           | Retrieves a war from a Clan War League group by war tag.                                                                                                                                    | `GET /clanwarleagues/wars/{warTag}`           |
| `clans.getCapitalRaidSeasons(clanTag, options?)`    | Retrieves the clan's Capital Raid season history. Paginated.                                                                                                                                | `GET /clans/{clanTag}/capitalraidseasons`     |

### Players

| Method                                           | Purpose and arguments                                                 | Path                                     |
| ------------------------------------------------ | --------------------------------------------------------------------- | ---------------------------------------- |
| `players.get(playerTag, options?)`               | Retrieves a player profile.                                           | `GET /players/{playerTag}`               |
| `players.getBattlelog(playerTag, options?)`      | Retrieves the player's battle log.                                    | `GET /players/{playerTag}/battlelog`     |
| `players.verifyToken(playerTag, body, options?)` | Verifies a player-provided token. `body` must be `{ token: string }`. | `POST /players/{playerTag}/verifytoken`  |
| `players.getLeagueHistory(playerTag, options?)`  | Retrieves the player's league history.                                | `GET /players/{playerTag}/leaguehistory` |

### Leagues

| Method                                                                           | Purpose and arguments                                                            | Path                                                  |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `leagues.getLeagueTiers(options?)` / `getLeagueTier(id, options?)`               | Lists league tiers or retrieves one by positive integer ID.                      | `GET /leaguetiers`, `/leaguetiers/{id}`               |
| `leagues.getLeagues(options?)` / `getLeague(id, options?)`                       | Lists leagues or retrieves one by positive integer ID.                           | `GET /leagues`, `/leagues/{id}`                       |
| `leagues.getLeagueSeasons(id, options?)`                                         | Lists seasons for a league. Paginated.                                           | `GET /leagues/{id}/seasons`                           |
| `leagues.getLeagueSeasonRankings(id, seasonId, options?)`                        | Retrieves rankings for a league season. `seasonId` must be non-empty. Paginated. | `GET /leagues/{id}/seasons/{seasonId}`                |
| `leagues.getLeagueGroup(tag, seasonId, options?)`                                | Retrieves a league group for a season.                                           | `GET /leaguegroup/{tag}/{seasonId}`                   |
| `leagues.getWarLeagues(options?)` / `getWarLeague(id, options?)`                 | Lists war leagues or retrieves one by ID.                                        | `GET /warleagues`, `/warleagues/{id}`                 |
| `leagues.getCapitalLeagues(options?)` / `getCapitalLeague(id, options?)`         | Lists Capital leagues or retrieves one by ID.                                    | `GET /capitalleagues`, `/capitalleagues/{id}`         |
| `leagues.getBuilderBaseLeagues(options?)` / `getBuilderBaseLeague(id, options?)` | Lists Builder Base leagues or retrieves one by ID.                               | `GET /builderbaseleagues`, `/builderbaseleagues/{id}` |

### Locations, rankings, Gold Pass, and labels

| Method                                                           | Purpose and arguments                                        | Path                                                |
| ---------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------- |
| `locations.getLocations(options?)` / `getLocation(id, options?)` | Lists locations or retrieves one by non-negative integer ID. | `GET /locations`, `/locations/{id}`                 |
| `locations.getClanRankings(id, options?)`                        | Retrieves clan rankings for a location.                      | `GET /locations/{id}/rankings/clans`                |
| `locations.getPlayerRankings(id, options?)`                      | Retrieves player rankings for a location.                    | `GET /locations/{id}/rankings/players`              |
| `locations.getBuilderBasePlayerRankings(id, options?)`           | Retrieves Builder Base player rankings.                      | `GET /locations/{id}/rankings/players-builder-base` |
| `locations.getBuilderBaseClanRankings(id, options?)`             | Retrieves Builder Base clan rankings.                        | `GET /locations/{id}/rankings/clans-builder-base`   |
| `locations.getCapitalRankings(id, options?)`                     | Retrieves Capital rankings.                                  | `GET /locations/{id}/rankings/capitals`             |
| `goldpass.getCurrentSeason(options?)`                            | Retrieves the current Gold Pass season.                      | `GET /goldpass/seasons/current`                     |
| `labels.getPlayerLabels(options?)`                               | Lists player labels. Paginated.                              | `GET /labels/players`                               |
| `labels.getClanLabels(options?)`                                 | Lists clan labels. Paginated.                                | `GET /labels/clans`                                 |

The public `client.fetch(endpoint, options?)` method is also available for a
supported API path not wrapped by a named endpoint method. It accepts a path
such as `"/clans"` and returns `Promise<Json>`; it does not provide arbitrary
HTTP methods or request bodies.

## Tags, IDs, and validation

Player, clan, war, and league-group tags may include or omit `#`:

```ts
await client.players.get(" #P289 ");
await client.clans.get("#2QG0");
```

Tags are restricted to the characters accepted by the client and invalid tags
raise `ValidationError` before a request is sent. League IDs must be positive
integers; location IDs must be non-negative integers; season IDs and player
verification tokens must be non-empty strings. Pagination `limit` must be an
integer from 1 through 100.

## Pagination

The wrapper sends pagination values exactly as supplied:

- Omit `before`, `after`, and `limit` for the first request.
- Use the API response's `paging.cursors.after` or `.before` value for a
  subsequent request; cursors are opaque strings, not page numbers.
- `limit` requests between 1 and 100 items.
- There is no automatic pagination; make another endpoint call yourself.

```ts
const first = await client.clans.getMembers("#2QG0", { limit: 25 });
const paging = first.paging as { cursors?: { after?: string } } | undefined;

if (paging?.cursors?.after) {
  const next = await client.clans.getMembers("#2QG0", {
    limit: 25,
    after: paging.cursors.after
  });
  console.log(next.items);
}
```

Only list methods marked as paginated in the endpoint reference send these
parameters. Detail, current-war, verification, and current-season methods do
not.

## Caching and request deduplication

Caching is disabled by default and is an in-memory cache scoped to one client
instance. The default TTL is 180,000 ms and the default maximum is 100 entries.
When full, the oldest cached entry is evicted. Entries are not shared between
processes and are not persisted across restarts.

Cache keys include the HTTP method, endpoint, query string, and request body.
Concurrent identical calls share one in-flight promise even when caching is
disabled; this deduplicates work but does not create a reusable cache entry.

```ts
const client = new ClashOfClansClient({
  token,
  cache: { enabled: true, ttl: 180_000, maxSize: 100 }
});

await client.clans.get("#2QG0", { cacheSeconds: 30 });
await client.clans.get("#2QG0", { useCache: false });

client.invalidateCache("GET:/clans/%232QG0");
client.clearCache();
```

`clearCache()` removes every entry. `invalidateCache(cacheKeyPrefix)` removes
the exact cache key and its query variants; include the `GET:` prefix, as in
the example, when targeting one endpoint. Calling it without an argument
clears everything. Only successful GET responses are cached.

## Timeouts, retries, and cancellation

Timeouts apply to each attempt. The default is 10,000 ms. `retries` means
additional attempts, so the default of `2` permits up to three attempts total.
Retryable failures are network errors, timeouts, HTTP 429 responses, and HTTP
5xx responses. Other HTTP errors are returned immediately.

Retries use exponential backoff capped at 10 seconds. Network and timeout
backoff includes a small random jitter. A 429 response uses its numeric or
HTTP-date `Retry-After` value when it can be parsed.

```ts
const result = await client.players.get("#P2", {
  timeout: 5_000,
  retries: 1
});
```

An `AbortSignal` rejects with `RequestAbortedError`. Aborting a call also
aborts its fetch attempt, while another caller sharing the same in-flight
request may continue waiting for that shared request:

```ts
const controller = new AbortController();
const request = client.locations.getPlayerRankings(32000000, {
  signal: controller.signal
});

controller.abort();
await request; // rejects with RequestAbortedError
```

Cancellation is cooperative; it cannot guarantee that a request which already
reached the server is undone.

## Errors

All exported custom errors extend `ClashOfClansAPIError`. They expose
`endpoint`, `method`, optional `statusCode`, `retryable`, and optional
`retryAfter`. Transport wrappers may also expose the original `cause`.

| Error                       | Meaning                                                                | Retry guidance                         |
| --------------------------- | ---------------------------------------------------------------------- | -------------------------------------- |
| `AuthenticationError` (401) | The API token was rejected.                                            | Fix the token; do not blindly retry.   |
| `AuthorizationError` (403)  | The token is not authorized, commonly because of API-key restrictions. | Fix access or IP configuration.        |
| `NotFoundError` (404)       | The requested resource was not found.                                  | Check the tag, ID, or season.          |
| `RateLimitError` (429)      | The API rate limit was exceeded. `retryAfter` may be milliseconds.     | Retry after the indicated delay.       |
| `ServerError` (5xx)         | The API returned a server error.                                       | A retry may succeed.                   |
| `NetworkError`              | The request could not reach the API.                                   | Check connectivity; retry may succeed. |
| `RequestTimeoutError`       | An attempt exceeded its timeout.                                       | Increase `timeout` or retry.           |
| `RequestAbortedError`       | The caller's signal aborted the request.                               | Do not retry unless intentional.       |
| `ValidationError`           | A local tag, ID, token, season, or limit was invalid.                  | Correct the input.                     |
| `ClashOfClansAPIError`      | A general HTTP or response-format failure.                             | Inspect `statusCode` and `retryable`.  |

```ts
try {
  const player = await client.players.get("#P2");
  console.log(player);
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Refresh the configured API key.
  } else if (error instanceof ClashOfClansAPIError) {
    console.error(error.statusCode, error.endpoint, error.message);
  } else {
    throw error;
  }
}
```

## TypeScript and public exports

The package exports `ClashOfClansClient`, the endpoint interfaces
(`ClanEndpoints`, `PlayerEndpoints`, `LeagueEndpoints`, `LocationEndpoints`,
`GoldPassEndpoints`, and `LabelEndpoints`), and these option types:
`ClashOfClansClientOptions`, `CacheOptions`, `RequestOptions`,
`PaginatedRequestOptions`, `QueryOptions`, and `ClanSearchOptions`.

Response-related exports are `Json`, `ListResponse<T>`, `Paging`,
`PagingCursor`, `VerifyPlayerTokenRequest`, and `VerifyPlayerTokenResponse`.
All errors listed above are exported as well. Responses mirror objects returned
by Supercell's API, but most endpoint responses are intentionally represented
as `Json`; the package does not runtime-validate every game-specific field.

## Legacy authentication API

`login`, `setAuthToken`, `getAuthToken`, and `getClient` are retained for code
that uses a shared client. `login` performs a real request to the player-label
endpoint with caching disabled; it stores the token only after that request
succeeds.

```ts
import { getClient, getAuthToken, login } from "clash-of-clans-node";

const token = process.env.CLASH_OF_CLANS_API_TOKEN;
if (!token) throw new Error("Missing API token");

await login(token);
const sharedClient = getClient();
console.log(getAuthToken() === token);
```

Prefer constructing `ClashOfClansClient` directly in new applications so
configuration and client lifetime are explicit. The legacy context is module
global within a process.

## Troubleshooting

- **401 / `AuthenticationError`:** the token is invalid, expired, or copied
  incorrectly. Create or replace it in the Developer Portal.
- **403 / `AuthorizationError`:** check that the API key allows the public IP
  address of the running environment.
- **404 / `NotFoundError`:** check the tag (including its `#`), numeric ID,
  season, and whether the resource exists in the official API.
- **429 / `RateLimitError`:** reduce request frequency and honor `retryAfter`.
  The client retries rate limits only while its retry budget remains.
- **Timeouts or `NetworkError`:** check connectivity and DNS, then adjust the
  per-attempt `timeout` if the API is slow.
- **Invalid pagination:** use an opaque cursor returned by `paging.cursors` and
  keep `limit` between 1 and 100.
- **Stale cache data:** disable caching for a call, lower `cacheSeconds`, or
  call `invalidateCache()`/`clearCache()`.
- **Import errors:** this package is ESM and requires Node.js 22 or newer.
  Use `import`, not CommonJS `require`.

## Development

```bash
npm install
npm run check
```

`check` runs formatting validation, ESLint, Jest with coverage, and the
TypeScript build. The package's `prepare` script builds `dist` before
publishing.

## Limitations

- Access, rate limits, uptime, and response fields are controlled by
  Supercell's API.
- The client does not automatically paginate or persist cache data.
- The wrapper does not add gameplay calculations or guarantee that every
  response field is represented by a dedicated TypeScript type.
- API keys are restricted by the IP configuration in the Developer Portal.

## License and attribution

This project is licensed under [CC BY-NC](./LICENCE). It is not endorsed by
Supercell and does not imply any affiliation with Supercell.
