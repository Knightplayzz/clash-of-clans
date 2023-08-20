const fetch = require('node-fetch');
const { searchClan } = require('../../functions/clans/searchClan');
const context = require('../../functions/auth/context'); // Import your context module

jest.mock('node-fetch');
jest.mock('../../functions/auth/context'); // Mock the context module

describe('searchClan function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear(); // Mock the getAuthToken function
    });

    it('should search clans with valid parameters', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ clans: ['Clan1', 'Clan2'] }),
        });

        const result = await searchClan('ClanName', 'ALWAYS', 123, 10, 50, 1000, 5, 20);

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashofclans.com/v1/clans?' +
            'name=ClanName&' +
            'warFrequency=ALWAYS&' +
            'locationId=123&' +
            'minMembers=10&' +
            'maxMembers=50&' +
            'minClanPoints=1000&' +
            'minClanLevel=5&' +
            'limit=20',
            {
                headers: { Authorization: 'Bearer dummyAuthToken' },
            }
        );

        expect(result).toEqual({ clans: ['Clan1', 'Clan2'] });
    });

    // Write additional test cases to cover other scenarios, including invalid input parameters.
    // ...

    // Example test cases for invalid input parameters
    it('should return an error when name is not a string', async () => {
        const result = await searchClan(123, 'ALWAYS', 123, 10, 50, 1000, 5, 20);
        expect(result).toEqual({
            error: '404',
            reason: 'Name must be a string',
            message: 'notFound',
        });
    });

    it('should return an error when warFrequency is not a string', async () => {
        const result = await searchClan('ClanName', 123, 123, 10, 50, 1000, 5, 20);
        expect(result).toEqual({
            error: '404',
            reason: 'WarFrequency must be a string',
            message: 'notFound',
        });
    });

    // Add more test cases for other parameter validations.
    // ...

    it('should handle errors when searching clans', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockRejectedValue(new Error('Fetch error'));

        try {
            await searchClan('ClanName', 'ALWAYS', 123, 10, 50, 1000, 5, 20);
        } catch (error) {
            expect(error.message).toBe('Fetch error');
        }
    });
});
