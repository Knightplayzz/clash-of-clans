const fetch = require('node-fetch');
const { getLocationById } = require('../../functions/locations/getLocationById');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getLocationById function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return location data if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ locationData: 'mockedLocationData' }),
        });

        const result = await getLocationById('123');

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/locations/123', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ locationData: 'mockedLocationData' });
    });

    it('should return error message if locationId is not a string', async () => {
        const result = await getLocationById(123);

        expect(result).toEqual({
            error: '404',
            reason: 'LocationId must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
