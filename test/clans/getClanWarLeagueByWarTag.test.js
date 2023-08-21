// Import necessary modules and dependencies
const fetch = require('node-fetch'); // Mocked later
const { getClanWarLeagueByWarTag } = require('../../functions/clans/getClanWarLeagueByWarTag'); // Replace with your actual module path

// Mock context.getAuthToken() to return a dummy token
jest.mock('../../functions/auth/context', () => ({
    getAuthToken: jest.fn(() => 'dummyAuthToken')
}));

// Mock fetch to return a fake response
jest.mock('node-fetch', () => {
    return jest.fn(() => ({
        json: jest.fn(() => ({ some: 'data' })), // Replace with your expected response data
    }));
});

describe('getClanWarLeagueByWarTag', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch data for a valid warTag', async () => {
        const warTag = 'validWarTag';
        const expectedUrl = 'https://api.clashofclans.com/v1/clanwarleagues/wars/validWarTag';

        const result = await getClanWarLeagueByWarTag(warTag);

        expect(result).toEqual({ some: 'data' });
        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            headers: { Authorization: 'Bearer dummyAuthToken' },
        });
    });

    it('should handle API request errors', async () => {
        // Mock fetch to throw an error
        fetch.mockImplementationOnce(() => {
            throw new Error('API Error');
        });

        const warTag = 'invalidWarTag';

        try {
            await getClanWarLeagueByWarTag(warTag);
        } catch (error) {
            expect(error.message).toBe('API Error');
        }
    });
});
