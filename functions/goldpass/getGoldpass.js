const fetch = require('node-fetch');

/**
 * Retrieves goldpass information.
 * @returns {Promise<JSON>} JSON
 */

async function getGoldpass() {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();

    const headers = { 'Authorization': `Bearer ${authToken}` };
    var fetchUrl = 'https://api.clashofclans.com/v1/goldpass/seasons/current';

    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { getGoldpass };  