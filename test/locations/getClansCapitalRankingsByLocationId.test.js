const fetch = require('node-fetch');
const context = require('../../functions/auth/context');
const { getClansCapitalRankingsByLocationId } = require('../../functions/locations/getClansCapitalRankingsByLocationId');

jest.mock('node-fetch');
jest.mock('../../functions/auth/context');

describe('getClansCapitalRankingsByLocationId', () => {
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
        const locationId = '123';
        const result = await getClansCapitalRankingsByLocationId(locationId);

        expect(result).toEqual({ mockData: 'some data' });

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashofclans.com/v1/locations/123/rankings/capitals',
            {
                headers: { 'Authorization': 'Bearer mockAuthToken' },
            }
        );
    });

    it('should make a GET request with the correct URL when limit is a number', async () => {
        const locationId = '123';
        const limit = 5;
        const result = await getClansCapitalRankingsByLocationId(locationId, limit);

        expect(result).toEqual({ mockData: 'some data' });

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashofclans.com/v1/locations/123/rankings/capitals?limit=5',
            {
                headers: { 'Authorization': 'Bearer mockAuthToken' },
            }
        );
    });

    it('should return an error object when locationId is not a string', async () => {
        const locationId = 123;
        const result = await getClansCapitalRankingsByLocationId(locationId);

        expect(result).toEqual({
            error: '404',
            reason: 'LocationId must be a string',
            message: 'notFound',
        });

        expect(fetch).not.toHaveBeenCalled();
    });

    it('should return an error object when limit is not a number', async () => {
        const locationId = '123';
        const limit = 'invalid';
        const result = await getClansCapitalRankingsByLocationId(locationId, limit);

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });

        expect(fetch).not.toHaveBeenCalled();
    });

    // Add more test cases as needed
});
