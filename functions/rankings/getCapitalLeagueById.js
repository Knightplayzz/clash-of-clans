const fetch = require('node-fetch');

/**
 *  Retrieves capital league information by leagueId.
 *  @param {number} leagueId - The league id of that league.
 *  @returns {Promise<JSON>} JSON
 */

async function getCapitalLeagueById(leagueId) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    if (typeof leagueId !== 'string') {
        return { 'error': '404', 'reason': 'LeagueId must be a string', 'message': 'notFound' };
    }
    var fetchUrl = `https://api.clashofclans.com/v1/capitalleagues/${leagueId}`;
    const headers = { 'Authorization': `Bearer ${authToken}` };
    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { getCapitalLeagueById };  