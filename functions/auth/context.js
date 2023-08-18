let authToken;

function setAuthToken(auth) {
    authToken = auth;
}
function getAuthToken() {
    return authToken;
}

module.exports = { setAuthToken, getAuthToken };