const fetch = require('node-fetch');
const { getCapitalLeagueById } = require('../../functions/rankings/getCapitalLeagueById');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getCapitalLeagueById function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return capital league data if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ capitalLeagueData: 'mockedCapitalLeagueData' }),
        });

        const result = await getCapitalLeagueById('123');

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/capitalleagues/123', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ capitalLeagueData: 'mockedCapitalLeagueData' });
    });

    it('should return error message if leagueId is not a string', async () => {
        const result = await getCapitalLeagueById(123);

        expect(result).toEqual({
            error: '404',
            reason: 'LeagueId must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
