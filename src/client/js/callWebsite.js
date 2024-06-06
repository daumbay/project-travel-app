async function callWebsite(url) {
    const response = await fetch(url);
    try {
        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export {callWebsite};