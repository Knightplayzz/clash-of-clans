const fetch = require('node-fetch');

/**
 * Retrieves the ranking of that season by seasonId.
 * @param {string} seasonId - The id of that season.
 * 
 *  @param {number} limit - Limit the number of items returned in the response (REQUIRED).
 *  @returns {Promise<JSON>} JSON
 */

async function getRankingBySeasonId(seasonId, limit) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    if (typeof seasonId !== 'string') {
        return { 'error': '404', 'reason': 'SeasonId must be a string', 'message': 'notFound' };
    }
    if (typeof limit !== 'number' && limit !== undefined) {
        return { 'error': '404', 'reason': 'Limit must be a number', 'message': 'notFound' };
    }
    if (!limit) return { 'error': '404', 'reason': 'Must set a limit', 'message': 'notFound' };
    var fetchUrl = `https://api.clashofclans.com/v1/leagues/29000022/seasons/${seasonId}?limit=${limit}`;
    const headers = { 'Authorization': `Bearer ${authToken}` };
    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { getRankingBySeasonId };  