const fetch = require('node-fetch');
const { getBuilderBaseLeagues } = require('../../functions/rankings/getBuilderBaseLeagues');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getBuilderBaseLeagues function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return builder base leagues data with no limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ builderBaseLeaguesData: 'mockedBuilderBaseLeaguesData' }),
        });

        const result = await getBuilderBaseLeagues();

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/builderbaseleagues', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ builderBaseLeaguesData: 'mockedBuilderBaseLeaguesData' });
    });

    it('should return builder base leagues data with specified limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ builderBaseLeaguesData: 'mockedBuilderBaseLeaguesData' }),
        });

        const result = await getBuilderBaseLeagues(10);

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/builderbaseleagues?limit=10', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ builderBaseLeaguesData: 'mockedBuilderBaseLeaguesData' });
    });

    it('should return error message if limit is not a number', async () => {
        const result = await getBuilderBaseLeagues('invalid_limit');

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
