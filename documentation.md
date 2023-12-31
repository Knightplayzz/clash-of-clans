<div align="center">
 <img src="https://1000logos.net/wp-content/uploads/2021/02/Clash-of-Clans-logo.png" height="200px"  alt="Clash Of Clans"/>
 <br>
 <p>A light-weight module that makes <a href="https://developer.clashofclans.com/">Clash Of Clans API</a> become easy.</p>
 <a href=""><img src="https://app.travis-ci.com/Knightplayzz/clash-of-clans.svg?branch=main"></a>
 <a href='https://coveralls.io/github/Knightplayzz/clash-of-clans?branch=main'><img src='https://coveralls.io/repos/github/Knightplayzz/clash-of-clans/badge.svg?branch=main' alt='Coverage Status' /></a>
 <a href="https://www.npmjs.com/package/clash-of-clans-node"><img src="https://img.shields.io/npm/dt/clash-of-clans-node.svg?maxAge=3600"></a>

<a href="https://www.npmjs.com/package/clash-of-clans-node"><img src="https://img.shields.io/npm/v/clash-of-clans-node" alt="Install size"></a>
 <a href="https://packagephobia.now.sh/result?p=clash-of-clans-node"><img src="https://badgen.net/packagephobia/install/clash-of-clans-node" alt="Current version"></a>
 </div>

# Documentation

## Introduction

Provides an easy way to get started with the [Clash of Clans API](https://developer.clashofclans.com)
For more information about the responses please check [Official Clash of Clans Dev Website](https://developer.clashofclans.com/api-docs/index.html). Not releated to Supercell.
Created By: Philippe Smeets

## Installation

`npm install clash-of-clans-node`

## Usage

All fetches return a promise using [request-promise](https://www.npmjs.com/package/request-promise)

## Instantiation

In order to get started with Clash of Clans API, you need to create an account at [developer.clashofclans.com](https://developer.clashofclans.com). Then go "My Account" and press on "Create New Key". Fill in the name, description and IP address and copy the key. This is the key that we are later going to use to authenticate you.

Once you get your token and have installed the module. Require the package into you file using ``require()`` and call the login function.

Example:

```javascript
const client = require('clash-of-clans-node');
await client.login('YOUR-TOKEN-HERE');
```

Remember that the ``client.login()`` is an asynchronised function.

# Documentation

## Authentication

### Login

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#login`` |   auth    | Logs the user in |

```javascript
await client.login('YOUR-TOKEN-HERE');
```

## Clan

### Get Clan by Tag

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getClan`` |   clanTag    |  Retrieves clan information by clanTag |

```javascript
await client.getClan('CLAN-TAG-HERE');
```

### Get Clan Capital Raid Season by Tag

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getClanCapitalRaidSeason`` |   clanTag, limit    |  Retrieves clan capital raid season by clanTag |

```javascript
await client.getClanCapitalRaidSeason('CLAN-TAG-HERE', limit)
```

### Get Clan Current War by Tag

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getClanCurrentWar`` |   clanTag   | Retrieves clan current war by clanTag |

```javascript
await client.getClanCurrentWar('CLAN-TAG-HERE');
```

### Get Clan Current War League Group by Tag

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getClanCurrentWarLeagueGroup`` |   clanTag   | Retrieves clan current war league group by clanTag |

```javascript
await client.getClanCurrentWarLeagueGroup('CLAN-TAG-HERE');
```

### Get Clan Members by Tag

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getClanMembers`` |   clanTag, limit   | Retrieves clan members by clanTag |

```javascript
await client.getClanMembers('CLAN-TAG-HERE', limit);
```

### Get Clan War League by War Tag

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getClanWarLeagueByWarTag`` |   warTag   | Retrieves information about individual clan war league war |

```javascript
await client.getClanWarLeagueByWarTag('WAR-TAG-HERE');
```

### Get Clan Warlog by Tag

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getClanWarLog`` |   clanTag, limit   | Retrieves clan war log by clanTag |

```javascript
await client.getClanWarLog('CLAN-TAG-HERE', limit);
```

### Search Clan

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#searchClan`` |   name, warFrequency, locationId, minMembers, maxMembers, minClanPoints, minClanLevel, limit   |  Retrieves clans based on search results |

```javascript
await client.searchClan(name, warFrequency, locationId, minMembers, maxMembers, minClanPoints, minClanLevel, limit);
```

## Player

### Get Player by Tag

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getPlayer`` |   playerTag    | Retrieves user information by playerTag |

```javascript
await client.getPlayer('PLAYER-TAG-HERE');
```

### Verify Player

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#verifyPlayer`` |   playerTag, token    | Verifies a player using their playerTag and token |

```javascript
await client.verifyPlayer('PLAYER-TAG-HERE', 'TOKEN');
```

## league

### Get Builder Base League by leagueId

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getBuilderBaseLeagueById`` |   leagueId    | Retrieves builder base league information  by leagueId |

```javascript
await client.getBuilderBaseLeagueById('LEAGUE-ID-HERE');
```

### Get Builder Base Leagues

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getBuilderBaseLeagues`` |   limit    | Retrieves all Builder base leagues |

```javascript
await client.getBuilderBaseLeagues(limit);
```

### Get Capital League by leagueId

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getCapitalLeagueById`` |   leagueId    | Retrieves capital league information  by leagueId |

```javascript
await client.getCapitalLeagueById('LEAGUE-ID-HERE');
```

### Get Capital Leagues

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getCapitalLeagues`` |   limit    | Retrieves all Capital leagues. |

```javascript
await client.getCapitalLeagues(limit);
```

### Get League by leagueId

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getLeagueById`` |   leagueId    | Retrieves league information by leagueId |

```javascript
await client.getLeagueById('LEAGUE-ID-HERE');
```

### Get Leagues

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getLeagues`` |   limit    | Retrieves all leagues |

```javascript
await client.getLeagues(limit);
```

### Get Ranking by seasonId

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getRankingBySeasonId`` |   seasonId, limit (REQUIRED)  | Retrieves the ranking of that season by seasonId |

```javascript
await client.getRankingBySeasonId('SEASON-ID-HERE', limit);
```

### Get seasonId

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getSeasonId`` |   limit  | Retrieves all season id's |

```javascript
await client.getSeasonId(limit);
```

### Get War League by leagueId

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getWarLeagueById`` |   leagueId  | Retrieves war league by leagueId |

```javascript
await client.getWarLeagueById('LEAGUE-ID-HERE');
```

### Get War Leagues

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getWarLeagues`` |   limit  | Retrieves all war leagues |

```javascript
await client.getWarLeagues(limit);
```

## location

### Get Clans Builder Base Rankings by locationId

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getClansBuilderBaseRankingsByLocationId`` |   locationId, limit  | Retrieves clans builder base rankings by locationId |

```javascript
await client.getClansBuilderBaseRankingsByLocationId('LOCATION-ID-HERE', limit);
```

### Get Clans Capital Rankings by locationId

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getClansCapitalRankingsByLocationId`` |   locationId, limit  | Retrieves clans capital rankings by locationId |

```javascript
await client.getClansCapitalRankingsByLocationId('LOCATION-ID-HERE', limit);
```

### Get Clans Rankings by locationId

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getClansRankingsByLocationId`` |   locationId, limit  | Retrieves clans rankings by locationId |

```javascript
 await client.getClansRankingsByLocationId('LOCATION-ID-HERE', limit);
```

### Get Location by Id

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getLocationById`` |   locationId  | Retrieves location information by locationId |

```javascript
await client.getLocationById('LOCATION-ID-HERE');
```

### Get Locations

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getLocations`` |   limit  | Retrieves all ranking locations |

```javascript
await client.getLocations(limit);
```

### Get Players Builder Base Rankings by locationId

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getPlayersRankingsByLocationId`` |   locationId, limit  | Retrieves players builder base rankings by locationId |

```javascript
await client.getPlayersBuilderBaseRankingsByLocationId('LOCATION-ID-HERE', limit);
```

### Get Players Rankings by locationId

|  Function  | Parameters | Description |
|------------|-----------|-------------|
| ``#getPlayersRankingsByLocationId`` |   locationId, limit  | Retrieves players rankings by locationId |

```javascript
await client.getPlayersRankingsByLocationId('LOCATION-ID-HERE', limit);
```

## Labels

### Get Clan Labels

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getLabelsClan`` |   limit  | Retrieves all clan labels |

```javascript
await client.getLabelsClan(limit);
```

### Get Player Labels

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#getLabelsPlayer`` |   limit  | Retrieves all player labels |

```javascript
await client.getLabelsPlayer(limit);
```

## Goldpass

### Get Goldpass

|  Function  | Description |
|------------|-------------|
| ``#getGoldpass`` | Retrieves goldpass information |

```javascript
await client.getGoldpass();
```

## INPUT

| Name      | Type    | Required | Description     |
|-----------|---------|----------|-----------------|
| auth      | string  |   True   | The Authentication Token granted by [developer.clashofclans.com](https://developer.clashofclans.com/)
| clanTag   | string  |   True   | The tag of the clan. Found in clan setting. |
| playerTag | string  |   True   | The tag of a player. Found in player's profile.  |
| token     | string  |   True   | The verification token of the user. Found in setting -> more settings -> API TOKEN.
| leagueId  | string  |   True   | The id of a league. Can differ from: builder base, warleague, capcapital and standard league (home villige). |
| seasonId  | string  |   True   | The id of that season. ``client.getSeasonId()`` will show all possible id's. |
| warTag    | string  |   True   | The tag of the war. Found with ``#getClanCurrentWarLeagueGroup``.
| locationId| String  |   True   | The id of the location. Found with ``#getLocations``.
| limit     | number  |   False  | Limit the number of items returned in the response. ``#getRankingBySeasonId`` limit is required due to many records.|
| minMembers| number  |   False  | The minimum members that are in the clan. |
| maxMembers| number  |   False  | The maximum members that are in the clan. |
| minClanPoints| number|   False  |  The minimum clan points that the clan has.|
| minClanLevel| number|   False  |  The minimum clan level that the clan is.|

## OUTPUT

| Name     | Type    | Optional | Description     |
|----------|---------|----------|-----------------|

## MORE OUTPUT DATA

For more output data please check the [Official Clash Of Clans Dev Website](https://developer.clashofclans.com/api-docs/index.html).

### Disclaimer

> This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it. For more information see Supercell's Fan Content Policy: <www.supercell.com/en/fan-content-policy/>
