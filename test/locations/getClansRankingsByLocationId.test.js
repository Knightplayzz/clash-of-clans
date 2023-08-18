const fetch = require('node-fetch');
const { getClansRankingsByLocationId } = require('../../functions/locations/getClansRankingsByLocationId');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getClansRankingsByLocationId function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return clans rankings data with no limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ clansRankingsData: 'mockedClansRankingsData' }),
        });

        const result = await getClansRankingsByLocationId('123');

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/locations/123/rankings/clans', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ clansRankingsData: 'mockedClansRankingsData' });
    });

    it('should return clans rankings data with specified limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ clansRankingsData: 'mockedClansRankingsData' }),
        });

        const result = await getClansRankingsByLocationId('123', 10);

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/locations/123/rankings/clans?limit=10', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ clansRankingsData: 'mockedClansRankingsData' });
    });

    it('should return error message if locationId is not a string', async () => {
        const result = await getClansRankingsByLocationId(123, 5);

        expect(result).toEqual({
            error: '404',
            reason: 'LocationId must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if limit is not a number', async () => {
        const result = await getClansRankingsByLocationId('123', 'invalid_limit');

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
