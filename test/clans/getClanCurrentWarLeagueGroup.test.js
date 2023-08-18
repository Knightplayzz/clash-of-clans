const fetch = require('node-fetch');
const { getClanCurrentWarLeagueGroup } = require('../../functions/clans/getClanCurrentWarLeagueGroup');
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getClanCurrentWarLeagueGroup function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return clan current war league group data if clanTag starts with "#" and fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ clanCurrentWarLeagueGroupData: 'mockedClanCurrentWarLeagueGroupData' }),
        });

        const result = await getClanCurrentWarLeagueGroup('#ABC123');

        expect(fetch).toHaveBeenCalledWith('https://api.clashofclans.com/v1/clans/%23ABC123/currentwar/leaguegroup', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ clanCurrentWarLeagueGroupData: 'mockedClanCurrentWarLeagueGroupData' });
    });

    it('should return error message if clanTag does not start with "#" symbol', async () => {
        const result = await getClanCurrentWarLeagueGroup('ABC123');

        expect(result).toEqual({
            error: '404',
            reason: 'clanTag must start with "#"',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if clanTag is not a string', async () => {
        const result = await getClanCurrentWarLeagueGroup(123);

        expect(result).toEqual({
            error: '404',
            reason: 'ClanTag must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
