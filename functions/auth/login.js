const fetch = require('node-fetch');

/**
 * @param {string} auth The authentication token used to make API requests.
*/
async function login(auth) {
    const context = require('./context');
    if (typeof auth !== 'string') {
        throw new Error('Authentication token must be a string.');
    }

    const headers = { 'Authorization': `Bearer ${auth}` };
    let personIdConvertString = encodeURIComponent("#QORLRUCO");
    let fetchUrl = `https://api.clashofclans.com/v1/players/${personIdConvertString}`;
    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    if (data.reason && data.reason !== undefined && data.reason !== null) throw new Error('Authentication token is wrong.');

    context.setAuthToken(auth);
    console.log("You succesfully logged in.")
}

module.exports = { login };