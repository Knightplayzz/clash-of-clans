const fetch = require('node-fetch');

/**
 * Retrieves all Builder base leagues.
 * 
 *  @param {number} limit - Limits the amount of ranking locations. (NOT REQUIRED)
 */

async function getBuilderBaseLeagues(limit) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();

    if (typeof limit !== 'number' && limit !== undefined) {
        return { "error": "404", "reason": "Limit must be a number", "message": "notFound" }
    }
    if (!limit) {
        var fetchUrl = `https://api.clashofclans.com/v1/builderbaseleagues`;
    } else {
        let limitConvertString = limit.toString();
        var fetchUrl = `https://api.clashofclans.com/v1/builderbaseleagues?limit=${limitConvertString}`;
    }

    const headers = { 'Authorization': `Bearer ${authToken}` };


    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;


}

module.exports = { getBuilderBaseLeagues }  