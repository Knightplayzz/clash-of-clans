const fetch = require('node-fetch');
/**
 * Retrieves the clans information.
 * @param {string} clanTag - The tag of the clan.
 */

async function getClan(clanTag) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    if (typeof clanTag !== 'string') {
        return { 'error': '404', 'reason': 'ClanTag must be a string', 'message': 'notFound' };
    }

    if (clanTag.startsWith('#')) {

        const headers = { 'Authorization': `Bearer ${authToken}` };
        let clanIdConvertString = encodeURIComponent(clanTag);

        let fetchUrl = `https://api.clashofclans.com/v1/clans/${clanIdConvertString}`;

        const response = await fetch(fetchUrl, { headers });
        const data = await response.json();
        return data;
    } else return { 'error': '404', 'reason': 'clanTag must start with "#"', 'message': 'notFound' };
}

module.exports = { getClan };  