const fetch = require('node-fetch');

/**
 * Retrieves a war league by id.
 *  @param {number} leagueId - The league id of that league.
 */

async function getWarLeagueById(leagueId) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();

    if (typeof leagueId !== 'string') {
        return { 'error': '404', 'reason': 'LeagueId must be a string', 'message': 'notFound' };
    }

    var fetchUrl = `https://api.clashofclans.com/v1/warleagues/${leagueId}`;
    const headers = { 'Authorization': `Bearer ${authToken}` };

    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { getWarLeagueById };  