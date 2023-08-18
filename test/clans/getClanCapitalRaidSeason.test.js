const fetch = require('node-fetch');
const { getClanCapitalRaidSeason } = require('../../functions/clans/getClanCapitalRaidSeason');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getClanCapitalRaidSeason function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return clan capital raid season data with no limit if clanTag starts with "#" and fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ clanCapitalRaidSeasonData: 'mockedClanCapitalRaidSeasonData' }),
        });

        const result = await getClanCapitalRaidSeason('#ABC123');

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/clans/%23ABC123/capitalraidseasons', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ clanCapitalRaidSeasonData: 'mockedClanCapitalRaidSeasonData' });
    });

    it('should return clan capital raid season data with specified limit if clanTag starts with "#" and fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ clanCapitalRaidSeasonData: 'mockedClanCapitalRaidSeasonData' }),
        });

        const result = await getClanCapitalRaidSeason('#ABC123', 10);

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/clans/%23ABC123/capitalraidseasons?limit=10', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ clanCapitalRaidSeasonData: 'mockedClanCapitalRaidSeasonData' });
    });

    it('should return error message if clanTag does not start with "#" symbol', async () => {
        const result = await getClanCapitalRaidSeason('ABC123', 5);

        expect(result).toEqual({
            error: '404',
            reason: 'clanTag must start with "#"',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if clanTag is not a string', async () => {
        const result = await getClanCapitalRaidSeason(123, 5);

        expect(result).toEqual({
            error: '404',
            reason: 'ClanTag must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if limit is not a number', async () => {
        const result = await getClanCapitalRaidSeason('#ABC123', 'invalid_limit');

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
