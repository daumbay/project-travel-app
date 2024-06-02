async function getCredentialsForGeonames() {
    const response = await fetch('/apiKey_Geonames');
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function callGeonames(url) {
    const response = await fetch(url);
    try {
        const data = await response;
        return data;
    } catch (error) {
        console.log(error);
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const location_geonames = document.querySelector('input[type="text"]').value;
    let url = '';
    let object = {};
    getCredentialsForGeonames()
    .then(key => {
        url = `http://api.geonames.org/postalCodeSearchJSON?placename=${location_geonames}&maxRows=10&username=${key.apiKey_Geonames}`;
    }).then(() => {
        callGeonames(url).then(data => data.json()).then(resp => object = resp.postalCodes[0]).then(() => console.log(object.lat, object.lng));
    });
}

export {getCredentialsForGeonames, callGeonames, handleSubmit};