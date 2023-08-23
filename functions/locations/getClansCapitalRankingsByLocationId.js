const fetch = require('node-fetch');

/**
 * Retrieves clans capital rankings by locationId
 * @param {string} locationId - The id of the location.
 * 
 *  @param {number} limit - Limit the number of items returned in the response.
 *  @returns {Promise<JSON>} JSON
 */
async function getClansCapitalRankingsByLocationId(locationId, limit) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    if (typeof locationId !== 'string') {
        return { 'error': '404', 'reason': 'LocationId must be a string', 'message': 'notFound' };
    }
    if (typeof limit !== 'number' && limit !== undefined) {
        return { 'error': '404', 'reason': 'Limit must be a number', 'message': 'notFound' };
    }
    var fetchUrl = '';
    let locationIdConvertString = encodeURIComponent(locationId);
    if (!limit) {
        fetchUrl = `https://api.clashofclans.com/v1/locations/${locationIdConvertString}/rankings/capitals`;
    } else {
        fetchUrl = `https://api.clashofclans.com/v1/locations/${locationIdConvertString}/rankings/capitals?limit=${limit}`;
    }
    const headers = { 'Authorization': `Bearer ${authToken}` };
    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { getClansCapitalRankingsByLocationId };  