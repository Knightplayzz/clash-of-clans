const fetch = require('node-fetch');

/**
 *  Retrieves location information by locationId.
 *  @param {number} locationId - The id of the location.
 *  @returns {Promise<JSON>} JSON
 */

async function getLocationById(locationId) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    if (typeof locationId !== 'string') {
        return { 'error': '404', 'reason': 'LocationId must be a string', 'message': 'notFound' };
    }
    var fetchUrl = `https://api.clashofclans.com/v1/locations/${locationId}`;
    const headers = { 'Authorization': `Bearer ${authToken}` };
    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { getLocationById };  