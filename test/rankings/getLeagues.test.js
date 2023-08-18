const fetch = require('node-fetch');
const { getLeagues } = require('../../functions/rankings/getLeagues');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getLeagues function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return leagues data with no limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ leaguesData: 'mockedLeaguesData' }),
        });

        const result = await getLeagues();

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/leagues', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ leaguesData: 'mockedLeaguesData' });
    });

    it('should return leagues data with specified limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ leaguesData: 'mockedLeaguesData' }),
        });

        const result = await getLeagues(10);

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/leagues?limit=10', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ leaguesData: 'mockedLeaguesData' });
    });

    it('should return error message if limit is not a number', async () => {
        const result = await getLeagues('invalid_limit');

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
