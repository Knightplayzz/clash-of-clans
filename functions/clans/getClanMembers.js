const fetch = require('node-fetch');
/**
 * Retrieves clans members by clanTag.
 * @param {string} clanTag - The tag of the clan.
 * 
 *  @param {number} limit - Limit the number of items returned in the response.
 *  @returns {Promise<JSON>} JSON
 */

async function getClanMembers(clanTag, limit) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    if (typeof clanTag !== 'string') {
        return { 'error': '404', 'reason': 'ClanTag must be a string', 'message': 'notFound' };
    }
    if (typeof limit !== 'number' && limit !== undefined) {
        return { 'error': '404', 'reason': 'Limit must be a number', 'message': 'notFound' };
    }

    if (clanTag.startsWith('#')) {
        const headers = { 'Authorization': `Bearer ${authToken}` };
        let clanIdConvertString = encodeURIComponent(clanTag);
        var fetchUrl = '';
        if (!limit) {
            fetchUrl = `https://api.clashofclans.com/v1/clans/${clanIdConvertString}/members`;
        } else {
            fetchUrl = `https://api.clashofclans.com/v1/clans/${clanIdConvertString}/members?limit=${limit}`;
        }

        const response = await fetch(fetchUrl, { headers });
        const data = await response.json();
        return data;
    } else return { 'error': '404', 'reason': 'clanTag must start with "#"', 'message': 'notFound' };
}

module.exports = { getClanMembers };  