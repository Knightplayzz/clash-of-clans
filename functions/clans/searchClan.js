const fetch = require('node-fetch');
/**
 * Retrieves information about individual clan war league war
 * @param {string} name - The tag of the clan.
 * 
 * @param {string} warFrequency - The frequency of the war.
 * 
 * @param {number} locationId - The id of the location.
 * 
 * @param {number} minMembers - The minimum members that are in the clan.
 * 
 * @param {number} maxMembers - The maximum members that are in the clan. 
 * 
 * @param {number} minClanPoints - The minimum clan points that the clan has.
 * 
 * @param {number} minClanLevel - The minimum clan level that the clan is.
 * 
 *  @param {number} limit - Limit the number of items returned in the response.
 *  @returns {Promise<JSON>} JSON
 */

async function searchClan(name, warFrequency, locationId, minMembers, maxMembers, minClanPoints, minClanLevel, limit) {
    //UNKNOWN, ALWAYS, MORE_THAN_ONCE_PER_WEEK, ONCE_PER_WEEK, LESS_THAN_ONCE_PER_WEEK, NEVER, ANY
    const context = require('../auth/context');
    const authToken = context.getAuthToken();

    if (typeof name !== 'string' && name !== undefined) { return { 'error': '404', 'reason': 'Name must be a string', 'message': 'notFound' }; }
    if (typeof warFrequency !== 'string' && limit !== undefined) { return { 'error': '404', 'reason': 'WarFrequency must be a string', 'message': 'notFound' }; }
    if (typeof locationId !== 'number' && locationId !== undefined) { return { 'error': '404', 'reason': 'LocationId must be a number', 'message': 'notFound' }; }
    if (typeof minMembers !== 'number' && minMembers !== undefined) { return { 'error': '404', 'reason': 'MinMembers must be a number', 'message': 'notFound' }; }
    if (typeof maxMembers !== 'number' && maxMembers !== undefined) { return { 'error': '404', 'reason': 'MaxMembers must be a number', 'message': 'notFound' }; }
    if (typeof minClanPoints !== 'number' && minClanPoints !== undefined) { return { 'error': '404', 'reason': 'MinClanPoints must be a number', 'message': 'notFound' }; }
    if (typeof minClanLevel !== 'number' && minClanLevel !== undefined) { return { 'error': '404', 'reason': 'minClanLevel must be a number', 'message': 'notFound' }; }
    if (typeof limit !== 'number' && limit !== undefined) { return { 'error': '404', 'reason': 'Limit must be a number', 'message': 'notFound' }; }

    //RETURNS IF NO VALUE
    var fetchUrl = 'https://api.clashofclans.com/v1/clans?';
    let convertName = encodeURIComponent(name);
    if (name !== undefined) { fetchUrl = fetchUrl + `name=${convertName}&`; }
    if (warFrequency !== undefined) { fetchUrl = fetchUrl + `warFrequency=${warFrequency}&`; }
    if (locationId !== undefined) { fetchUrl = fetchUrl + `locationId=${locationId}&`; }
    if (minMembers !== undefined) { fetchUrl = fetchUrl + `minMembers=${minMembers}&`; }
    if (maxMembers !== undefined) { fetchUrl = fetchUrl + `maxMembers=${maxMembers}&`; }
    if (minClanPoints !== undefined) { fetchUrl = fetchUrl + `minClanPoints=${minClanPoints}&`; }
    if (minClanLevel !== undefined) { fetchUrl = fetchUrl + `minClanLevel=${minClanLevel}&`; }
    if (limit !== undefined) { fetchUrl = fetchUrl + `limit=${limit}`; }

    if (fetchUrl.endsWith('&')) { fetchUrl = fetchUrl.slice(0, -1); }

    var realFetchUrl = fetchUrl;

    const headers = { 'Authorization': `Bearer ${authToken}` };
    const response = await fetch(realFetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { searchClan };  