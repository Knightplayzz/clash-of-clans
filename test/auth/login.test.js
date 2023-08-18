const fetch = require('node-fetch'); // You need to mock this dependency for testing
const { login } = require('../../functions/auth/login');
const context = require('../../functions/auth/context'); // Mock this dependency as well

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('login function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return success message and set auth token if login is successful', async () => {
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({}),
        });

        const result = await login('valid_auth_token');

        expect(context.setAuthToken).toHaveBeenCalledWith('valid_auth_token');
        expect(result).toEqual({ status: '200', message: 'OK' });
    });

    it('should throw an error if authentication token is wrong', async () => {
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ reason: 'Some reason' }),
        });

        await expect(login('invalid_auth_token')).rejects.toThrow('Authentication token is wrong.');
    });

    it('should throw an error if authentication token is not a string', async () => {
        await expect(login(123)).rejects.toThrow('Authentication token must be a string.');
    });
});



