const fetch = require('node-fetch');
const { getGoldpass } = require('../../functions/goldpass/getGoldpass');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getGoldpass function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return gold pass data if fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ goldPassData: 'mockedGoldPassData' }),
        });

        const result = await getGoldpass();

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/goldpass/seasons/current', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ goldPassData: 'mockedGoldPassData' });
    });
});
