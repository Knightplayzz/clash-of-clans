const fetch = require('node-fetch');

/**
 * Retrieves the ranking of that season.
 * @param {string} seasonId - The id of that season. Found with #getSeasonId
 * 
 *  @param {number} limit - Limits the amount of season id's. (REQUIRED)
 */

async function getRankingBySeasonId(seasonId, limit) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();

    if (typeof seasonId !== 'string') {
        return { "error": "404", "reason": "SeasonId must be a string", "message": "notFound" }
    }
    if (typeof limit !== 'number' && limit !== undefined) {
        return { "error": "404", "reason": "Limit must be a number", "message": "notFound" }
    }
    if (!limit) {
        return { "error": "404", "reason": "must set a limit", "message": "notFound" }
    } else {
        let limitConvertString = limit.toString();
        var fetchUrl = `https://api.clashofclans.com/v1/leagues/29000022/seasons/${seasonId}?limit=${limitConvertString}`;
    }

    const headers = { 'Authorization': `Bearer ${authToken}` };
    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { getRankingBySeasonId }  