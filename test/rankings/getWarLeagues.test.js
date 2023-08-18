const fetch = require('node-fetch');
const { getWarLeagues } = require('../../functions/rankings/getWarLeagues');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getWarLeagues function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return war league data if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ leagues: ['data1', 'data2'] }),
        });

        const result = await getWarLeagues();

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashofclans.com/v1/warleagues',
            {
                headers: { Authorization: 'Bearer valid_auth_token' },
            }
        );
        expect(result).toEqual({ leagues: ['data1', 'data2'] });
    });

    it('should return war league data with limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ leagues: ['data1', 'data2'] }),
        });

        const result = await getWarLeagues(10);

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashofclans.com/v1/warleagues?limit=10',
            {
                headers: { Authorization: 'Bearer valid_auth_token' },
            }
        );
        expect(result).toEqual({ leagues: ['data1', 'data2'] });
    });

    it('should return error message if limit is not a number', async () => {
        const result = await getWarLeagues('invalid_limit');

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
