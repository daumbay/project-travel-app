import { callWebsite } from "../src/client/js/callWebsite";

beforeEach(() => {
    fetch.resetMocks();
});

it('Check variable validity', async () => {
    fetch.mockResponseOnce(JSON.stringify({data: "mockData"}));
    const url = 'google';
    callWebsite(url).then(res => {
        expect(res.data).toEqual('mockData');
    })
});