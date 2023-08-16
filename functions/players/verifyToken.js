const fetch = require('node-fetch');
/**
 * Verifies a player using their playerTag and token.
 * @param {string} playerTag - The tag of the user.
 * 
 * @param {string} token - The verification token.
 * @returns {Promise<JSON>} JSON
 */

async function verifyPlayer(playerTag, token) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    if (typeof playerTag !== 'string') {
        return { 'error': '404', 'reason': 'PlayerTag must be a string', 'message': 'notFound' };
    }
    if (typeof token !== 'string') {
        return { 'error': '404', 'reason': 'Token must be a string', 'message': 'notFound' };
    }
    if (playerTag.startsWith('#')) {
        const headers = { 'Authorization': `Bearer ${authToken}` };
        let personIdConvertString = encodeURIComponent(playerTag);
        let fetchUrl = `https://api.clashofclans.com/v1/players/${personIdConvertString}/verifytoken`;
        const requestData = {
            'token': token
        };
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData) // Convert data to JSON string
        };
        const response = await fetch(fetchUrl, requestOptions);
        const data = await response.json();
        return data;
    } else return { 'error': '404', 'reason': 'PlayerTag must start with "#"', 'message': 'notFound' };
}

module.exports = { verifyPlayer }; 