const fetch = require('node-fetch');
const { getWarLeagueById } = require('../../functions/rankings/getWarLeagueById');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getWarLeagueById function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return war league data if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ leagueData: 'some_data' }),
        });

        const result = await getWarLeagueById('some_id');

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashofclans.com/v1/warleagues/some_id',
            {
                headers: { Authorization: 'Bearer valid_auth_token' },
            }
        );
        expect(result).toEqual({ leagueData: 'some_data' });
    });

    it('should return error message if leagueId is not a string', async () => {
        const result = await getWarLeagueById(123);

        expect(result).toEqual({
            error: '404',
            reason: 'LeagueId must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
