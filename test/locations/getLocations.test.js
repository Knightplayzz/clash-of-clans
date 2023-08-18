const fetch = require('node-fetch');
const { getLocations } = require('../../functions/locations/getLocations');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getLocations function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return locations data with no limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ locationsData: 'mockedLocationsData' }),
        });

        const result = await getLocations();

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/locations', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ locationsData: 'mockedLocationsData' });
    });

    it('should return locations data with specified limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ locationsData: 'mockedLocationsData' }),
        });

        const result = await getLocations(10);

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/locations?limit=10', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ locationsData: 'mockedLocationsData' });
    });

    it('should return error message if limit is not a number', async () => {
        const result = await getLocations('invalid_limit');

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
