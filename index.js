//auth
const { login } = require('./functions/auth/login');

//player
const { getPlayer } = require('./functions/players/getPlayer');
const { verifyPlayer } = require('./functions/players/verifyToken');

//clan
const { getClan } = require('./functions/clan/getClan');
const { getClanMembers } = require('./functions/clan/getClanMembers');
const { getClanCurrentWarLeagueGroup } = require('./functions/clan/getClanCurrentWarLeagueGroup');
const { getClanWarLog } = require('./functions/clan/getClanWarLog');
const { getClanCapitalRaidSeason } = require('./functions/clan/getClanCapitalRaidSeason')
const { getClanCurrentWar } = require('./functions/clan/getClanCurrentWar')
//search clan
//clanwarTag

//goldpass
const { getGoldpass } = require('./functions/goldpass/getGoldpass');

//ranking
const { getLeagues } = require('./functions/rankings/getLeagues')
const { getCapitalLeagues } = require('./functions/rankings/getCapitalLeagues')
const { getWarLeagues } = require('./functions/rankings/getWarLeagues')
const { getBuilderBaseLeagues } = require('./functions/rankings/getBuilderBaseLeagues')

const { getWarLeagueById } = require('./functions/rankings/getWarLeagueById');
const { getLeagueById } = require('./functions/rankings/getLeagueById');
const { getBuilderBaseLeagueById } = require('./functions/rankings/getBuilderBaseLeagueById');
const { getCapitalLeagueById } = require('./functions/rankings/getCapitalLeagueById');

const { getSeasonId } = require('./functions/rankings/getSeasonId')
const { getRankingBySeasonId } = require('./functions/rankings/getRankingBySeasonId');

//locations
const { getLocations } = require('./functions/locations/getLocations');




//players
module.exports = { login, getClan, getClanMembers, getClanCurrentWarLeagueGroup, getClanWarLog, getClanCapitalRaidSeason, getClanCurrentWar, getGoldpass, getLocations, getLeagues, getCapitalLeagues, getWarLeagues, getBuilderBaseLeagues, getLeagueById, getWarLeagueById, getBuilderBaseLeagueById, getCapitalLeagueById, getSeasonId, getRankingBySeasonId, getPlayer, verifyPlayer }  