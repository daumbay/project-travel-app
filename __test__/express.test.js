import { getKey_Geonames } from '../src/server/api';

const req = {};
const res = {
    send: jest.fn((x) => x),
};
const apiKey_Geonames = 'dummy';

it('should return an api key for Geonames', () => {
    getKey_Geonames(req, res);
    expect(res.send).toHaveBeenCalledTimes(1);
});
