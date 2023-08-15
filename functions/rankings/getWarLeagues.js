const fetch = require('node-fetch');

/**
 * Retrieves war leagues.
 *  @param {number} limit - Limits the amount of ranking locations. (NOT REQUIRED)
 */

async function getWarLeagues(limit) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();

    if (typeof limit !== 'number' && limit !== undefined) {
        return { 'error': '404', 'reason': 'Limit must be a number', 'message': 'notFound' };
    }
    var fetchUrl = '';
    if (!limit) {
        fetchUrl = 'https://api.clashofclans.com/v1/warleagues';
    } else {
        let limitConvertString = limit.toString();
        fetchUrl = `https://api.clashofclans.com/v1/warleagues?limit=${limitConvertString}`;
    }

    const headers = { 'Authorization': `Bearer ${authToken}` };


    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;


}

module.exports = { getWarLeagues };  