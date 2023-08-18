const fetch = require('node-fetch');
const { getPlayer } = require('../../functions/players/getPlayer');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getPlayer function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return player data if playerTag starts with "#" and fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ playerData: 'mockedPlayerData' }),
        });

        const result = await getPlayer('#QORLRUCO');

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/players/%23QORLRUCO', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ playerData: 'mockedPlayerData' });
    });

    it('should return error message if playerTag does not start with "#" symbol', async () => {
        const result = await getPlayer('QORLRUCO');

        expect(result).toEqual({
            error: '404',
            reason: 'playerTag must start with "#"',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if playerTag is not a string', async () => {
        const result = await getPlayer(123);

        expect(result).toEqual({
            error: '404',
            reason: 'PlayerTag must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
