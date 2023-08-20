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

    it('should construct the fetch URL correctly with all parameters', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ clans: ['Clan1', 'Clan2'] }),
        });

        await searchClan(
            'ClanName',
            'ALWAYS',
            123,
            10,
            50,
            1000,
            5,
            20
        );

        const expectedUrl =
            'https://api.clashofclans.com/v1/clans?' +
            'name=ClanName&' +
            'warFrequency=ALWAYS&' +
            'locationId=123&' +
            'minMembers=10&' +
            'maxMembers=50&' +
            'minClanPoints=1000&' +
            'minClanLevel=5&' +
            'limit=20';

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            headers: { Authorization: 'Bearer dummyAuthToken' },
        });
    });

    it('should construct the fetch URL correctly with minimal parameters', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ clans: ['Clan1', 'Clan2'] }),
        });

        await searchClan('ClanName', 'ALWAYS');

        const expectedUrl =
            'https://api.clashofclans.com/v1/clans?' +
            'name=ClanName&' +
            'warFrequency=ALWAYS';

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            headers: { Authorization: 'Bearer dummyAuthToken' },
        });
    });

    it('should construct the fetch URL with only name and warFrequency', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ clans: ['Clan1', 'Clan2'] }),
        });

        await searchClan('ClanName', 'ALWAYS', undefined, undefined, undefined, undefined, undefined, undefined);

        const expectedUrl =
            'https://api.clashofclans.com/v1/clans?' +
            'name=ClanName&' +
            'warFrequency=ALWAYS';

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            headers: { Authorization: 'Bearer dummyAuthToken' },
        });
    });

    it('should handle errors when fetching clans', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockRejectedValue(new Error('Fetch error'));

        try {
            await searchClan('ClanName', 'ALWAYS', 123, 10, 50, 1000, 5, 20);
        } catch (error) {
            expect(error.message).toBe('Fetch error');
        }
    });

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

    it('should return an error when locationId is not a number', async () => {
        const result = await searchClan('ClanName', 'ALWAYS', 'NotANumber', 10, 50, 1000, 5, 20);
        expect(result).toEqual({
            error: '404',
            reason: 'LocationId must be a number',
            message: 'notFound',
        });
    });

    it('should return an error when minMembers is not a number', async () => {
        const result = await searchClan('ClanName', 'ALWAYS', 123, 'NotANumber', 50, 1000, 5, 20);
        expect(result).toEqual({
            error: '404',
            reason: 'MinMembers must be a number',
            message: 'notFound',
        });
    });

    it('should return an error when maxMembers is not a number', async () => {
        const result = await searchClan('ClanName', 'ALWAYS', 123, 10, 'NotANumber', 1000, 5, 20);
        expect(result).toEqual({
            error: '404',
            reason: 'MaxMembers must be a number',
            message: 'notFound',
        });
    });

    it('should return an error when minClanPoints is not a number', async () => {
        const result = await searchClan('ClanName', 'ALWAYS', 123, 10, 50, 'NotANumber', 5, 20);
        expect(result).toEqual({
            error: '404',
            reason: 'MinClanPoints must be a number',
            message: 'notFound',
        });
    });

    it('should return an error when minClanLevel is not a number', async () => {
        const result = await searchClan('ClanName', 'ALWAYS', 123, 10, 50, 1000, 'NotANumber', 20);
        expect(result).toEqual({
            error: '404',
            reason: 'minClanLevel must be a number',
            message: 'notFound',
        });
    });

    it('should return an error when limit is not a number', async () => {
        const result = await searchClan('ClanName', 'ALWAYS', 123, 10, 50, 1000, 5, 'NotANumber');
        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });
    });

    // Add more test cases to cover other scenarios.
    it('should construct the fetch URL correctly with parameter clanName', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ clans: ['Clan1', 'Clan2'] }),
        });

        await searchClan(
            'ClanName'
        );

        const expectedUrl =
            'https://api.clashofclans.com/v1/clans?' +
            'name=ClanName';

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            headers: { Authorization: 'Bearer dummyAuthToken' },
        });
    });
    it('should construct the fetch URL correctly with parameter warFrequency', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ clans: ['Clan1', 'Clan2'] }),
        });

        await searchClan(
            undefined,
            'NEVER'
        );

        const expectedUrl =
            'https://api.clashofclans.com/v1/clans?' +
            'warFrequency=NEVER';

        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            headers: { Authorization: 'Bearer dummyAuthToken' },
        });
    });
});
