const fetch = require('node-fetch');
const { getRankingBySeasonId } = require('../../functions/rankings/getRankingBySeasonId');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getRankingBySeasonId function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return ranking data with a specified seasonId and limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ rankingData: 'mockedRankingData' }),
        });

        const result = await getRankingBySeasonId('123', 10);

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashofclans.com/v1/leagues/29000022/seasons/123?limit=10',
            {
                headers: { Authorization: 'Bearer valid_auth_token' },
            }
        );
        expect(result).toEqual({ rankingData: 'mockedRankingData' });
    });

    it('should return error message if seasonId is not a string', async () => {
        const result = await getRankingBySeasonId(123, 10);

        expect(result).toEqual({
            error: '404',
            reason: 'SeasonId must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if limit is not a number', async () => {
        const result = await getRankingBySeasonId('123', 'invalid_limit');

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if no limit is set', async () => {
        const result = await getRankingBySeasonId('123');

        expect(result).toEqual({
            error: '404',
            reason: 'Must set a limit',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
