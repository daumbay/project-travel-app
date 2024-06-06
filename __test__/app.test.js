import { callWebsite } from "../src/client/js/callWebsite";

const url = 'https://api.github.com/users/hadley/orgs';

it('Check variable validity', async () => {
    const response = await callWebsite(url);
    expect(response).toBeDefined();
});