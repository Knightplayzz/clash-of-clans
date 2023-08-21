//auth
const { login } = require('./functions/auth/login');

//player
const { getPlayer } = require('./functions/players/getPlayer');
const { verifyPlayer } = require('./functions/players/verifyToken');

//clan
const { getClan } = require('./functions/clans/getClan');
const { getClanMembers } = require('./functions/clans/getClanMembers');
const { getClanCurrentWarLeagueGroup } = require('./functions/clans/getClanCurrentWarLeagueGroup');
const { getClanWarLog } = require('./functions/clans/getClanWarLog');
const { getClanCapitalRaidSeason } = require('./functions/clans/getClanCapitalRaidSeason');
const { getClanCurrentWar } = require('./functions/clans/getClanCurrentWar');
const { searchClan } = require('./functions/clans/searchClan');
const { getClanWarLeagueByWarTag } = require('./functions/clans/getClanWarLeagueByWarTag');

//goldpass
const { getGoldpass } = require('./functions/goldpass/getGoldpass');

//ranking
const { getLeagues } = require('./functions/rankings/getLeagues');
const { getCapitalLeagues } = require('./functions/rankings/getCapitalLeagues');
const { getWarLeagues } = require('./functions/rankings/getWarLeagues');
const { getBuilderBaseLeagues } = require('./functions/rankings/getBuilderBaseLeagues');

const { getWarLeagueById } = require('./functions/rankings/getWarLeagueById');
const { getLeagueById } = require('./functions/rankings/getLeagueById');
const { getBuilderBaseLeagueById } = require('./functions/rankings/getBuilderBaseLeagueById');
const { getCapitalLeagueById } = require('./functions/rankings/getCapitalLeagueById');

const { getSeasonId } = require('./functions/rankings/getSeasonId');
const { getRankingBySeasonId } = require('./functions/rankings/getRankingBySeasonId');

//locations
const { getLocations } = require('./functions/locations/getLocations');
const { getLocationById } = require('./functions/locations/getLocationById');
const { getClansRankingsByLocationId } = require('./functions/locations/getClansRankingsByLocationId');
const { getClansBuilderBaseRankingsByLocationId } = require('./functions/locations/getClansBuilderBaseRankingsByLocationId');
const { getPlayersRankingsByLocationId } = require('./functions/locations/getPlayersRankingsByLocationId');
const { getPlayersBuilderBaseRankingsByLocationId } = require('./functions/locations/getPlayersBuilderBaseRankingsByLocationId');


//players
module.exports = { login, getClan, searchClan, getClanWarLeagueByWarTag, getClanMembers, getClanCurrentWarLeagueGroup, getClanWarLog, getClanCapitalRaidSeason, getClanCurrentWar, getGoldpass, getLocations, getLeagues, getCapitalLeagues, getWarLeagues, getBuilderBaseLeagues, getLeagueById, getWarLeagueById, getBuilderBaseLeagueById, getCapitalLeagueById, getSeasonId, getRankingBySeasonId, getPlayer, verifyPlayer, getLocationById, getClansRankingsByLocationId, getPlayersRankingsByLocationId, getClansBuilderBaseRankingsByLocationId, getPlayersBuilderBaseRankingsByLocationId };  