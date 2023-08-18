var authToken; // Declare the authToken outside the functions for testing purposes
const { setAuthToken, getAuthToken } = require('../../functions/auth/context');

describe('Authentication Token Functions', () => {
    beforeEach(() => {
        // Reset the authToken before each test
        authToken = undefined;
    });
    it('should return undefined if authentication token has not been set', () => {
        const retrievedAuthToken = getAuthToken();
        expect(retrievedAuthToken).toBeUndefined();
    });

    it('should set and get the authentication token', () => {
        const newAuthToken = 'new_auth_token';
        setAuthToken(newAuthToken);
        const retrievedAuthToken = getAuthToken();
        expect(retrievedAuthToken).toBe(newAuthToken);
    });
});
