const fetch = require('node-fetch');

/**
 *  Retrieves all Capital leagues.
 *  @param {number} limit - Limit the number of items returned in the response.
 *  @returns {Promise<JSON>} JSON
 */

async function getCapitalLeagues(limit) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    if (typeof limit !== 'number' && limit !== undefined) {
        return { 'error': '404', 'reason': 'Limit must be a number', 'message': 'notFound' };
    }
    var fetchUrl = '';
    if (!limit) {
        fetchUrl = 'https://api.clashofclans.com/v1/capitalleagues';
    } else {
        fetchUrl = `https://api.clashofclans.com/v1/capitalleagues?limit=${String}`;
    }
    const headers = { 'Authorization': `Bearer ${authToken}` };
    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { getCapitalLeagues };  