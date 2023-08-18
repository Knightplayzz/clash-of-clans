const fetch = require('node-fetch');
const { getSeasonId } = require('../../functions/rankings/getSeasonId');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getSeasonId function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return season IDs with a specified limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ seasonIds: ['id1', 'id2'] }),
        });

        const result = await getSeasonId(5);

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashofclans.com/v1/leagues/29000022/seasons?limit=5',
            {
                headers: { Authorization: 'Bearer valid_auth_token' },
            }
        );
        expect(result).toEqual({ seasonIds: ['id1', 'id2'] });
    });

    it('should return error message if limit is not a number', async () => {
        const result = await getSeasonId('invalid_limit');

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return season IDs without a specified limit if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ seasonIds: ['id1', 'id2'] }),
        });

        const result = await getSeasonId();

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashofclans.com/v1/leagues/29000022/seasons',
            {
                headers: { Authorization: 'Bearer valid_auth_token' },
            }
        );
        expect(result).toEqual({ seasonIds: ['id1', 'id2'] });
    });
});
