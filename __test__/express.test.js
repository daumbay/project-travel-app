import {} from '../src/server/server';

test('Testing variable validity', () => {
    const apiKey_Geonames = process.env.API_KEY_GEONAMES;
    expect (apiKey_Geonames).toBeDefined();
});

