const fetch = require('node-fetch');
/**
* Retrieves user information by playerTag.
* @param {string} playerTag - The tag of the user.
* @returns {Promise<JSON>} JSON
*/

async function getPlayer(playerTag) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    if (typeof playerTag !== 'string') {
        return { 'error': '404', 'reason': 'PlayerTag must be a string', 'message': 'notFound' };
    }
    if (playerTag.startsWith('#')) {
        const headers = { 'Authorization': `Bearer ${authToken}` };
        let personIdConvertString = encodeURIComponent(playerTag);
        let fetchUrl = `https://api.clashofclans.com/v1/players/${personIdConvertString}`;
        const response = await fetch(fetchUrl, { headers });
        const data = await response.json();
        return data;
    } else return { 'error': '404', 'reason': 'playerTag must start with "#"', 'message': 'notFound' };

}
module.exports = { getPlayer };