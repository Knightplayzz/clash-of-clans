const fetch = require('node-fetch');
const { getBuilderBaseLeagueById } = require('../../functions/rankings/getBuilderBaseLeagueById');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getBuilderBaseLeagueById function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return builder base league data if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ builderBaseLeagueData: 'mockedBuilderBaseLeagueData' }),
        });

        const result = await getBuilderBaseLeagueById('123');

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/builderbaseleagues/123', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ builderBaseLeagueData: 'mockedBuilderBaseLeagueData' });
    });

    it('should return error message if leagueId is not a string', async () => {
        const result = await getBuilderBaseLeagueById(123);

        expect(result).toEqual({
            error: '404',
            reason: 'LeagueId must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
