const fetch = require('node-fetch');
const context = require('../../functions/auth/context');
const { getLabelsClan } = require('../../functions/labels/getLabelsClan'); // Import your function

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getLabelsClan', () => {
    beforeEach(() => {
        context.getAuthToken.mockReturnValue('mockAuthToken');
        fetch.mockResolvedValue({
            json: async () => ({ mockData: 'some data' }),
        });
    });

    afterEach(() => {
        fetch.mockClear();
    });

    it('should make a GET request with the correct URL when limit is undefined', async () => {
        const result = await getLabelsClan();

        expect(result).toEqual({ mockData: 'some data' });

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashofclans.com/v1/labels/clans',
            {
                headers: { 'Authorization': 'Bearer mockAuthToken' },
            }
        );
    });

    it('should make a GET request with the correct URL when limit is a number', async () => {
        const limit = 5;
        const result = await getLabelsClan(limit);

        expect(result).toEqual({ mockData: 'some data' });

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashofclans.com/v1/labels/clans?limit=5',
            {
                headers: { 'Authorization': 'Bearer mockAuthToken' },
            }
        );
    });

    it('should return an error object when limit is not a number', async () => {
        const limit = 'invalid';
        const result = await getLabelsClan(limit);

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });

        // Ensure that fetch was not called
        expect(fetch).not.toHaveBeenCalled();
    });

    // Add more test cases as needed
});
