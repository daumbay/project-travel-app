import { getKey_Geonames } from '../src/server/api_Geonames.js';

const req = {};
const res = {
    send: jest.fn((x) => x),
};

it('should return an api key for Geonames', () => {
    getKey_Geonames(req, res);
    expect(res.send).toHaveBeenCalledTimes(1);
});