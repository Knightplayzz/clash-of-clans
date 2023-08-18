const fetch = require('node-fetch');
const { verifyPlayer } = require('../../functions/players/verifyToken');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('verifyPlayer function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return verification result if playerTag starts with "#" and fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ verificationResult: true }),
        });

        const result = await verifyPlayer('#QORLRUCO', 'valid_token');

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/players/%23QORLRUCO/verifytoken', {
            method: 'POST',
            headers: { Authorization: 'Bearer valid_auth_token' },
            body: JSON.stringify({ token: 'valid_token' }),
        });
        expect(result).toEqual({ verificationResult: true });
    });

    it('should return error message if playerTag does not start with "#" symbol', async () => {
        const result = await verifyPlayer('QORLRUCO', 'valid_token');

        expect(result).toEqual({
            error: '404',
            reason: 'PlayerTag must start with "#"',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if playerTag is not a string', async () => {
        const result = await verifyPlayer(123, 'valid_token');

        expect(result).toEqual({
            error: '404',
            reason: 'PlayerTag must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if token is not a string', async () => {
        const result = await verifyPlayer('#QORLRUCO', 123);

        expect(result).toEqual({
            error: '404',
            reason: 'Token must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
