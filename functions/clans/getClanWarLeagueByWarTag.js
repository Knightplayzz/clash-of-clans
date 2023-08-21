const fetch = require('node-fetch');
/**
 * Retrieves information about individual clan war league war
 * @param {string} warTag - The tag of the war.
 * 
 *  @returns {Promise<JSON>} JSON
 */

async function getClanWarLeagueByWarTag(warTag) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();

    const headers = { 'Authorization': `Bearer ${authToken}` };
    let warTagConverString = encodeURIComponent(warTag);
    var fetchUrl = `https://api.clashofclans.com/v1/clanwarleagues/wars/${warTagConverString}`;

    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { getClanWarLeagueByWarTag };  