async function getCredentialsForGeonames() {
    const response = await fetch('/apiKey_Geonames');
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getCredentialsForWeatherbit() {
    const response = await fetch('/apiKey_Weatherbit');
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

async function callWeatherbit(url) {
    const response = await fetch(url);
    try {
        const data = await response;
        return data;
    } catch (error) {
        console.log(error);
    }
}

function getCountdown() {
    // Get the current date in epoch
    const todayDate_ms = new Date().getTime();

    // Get the trip date in epoch
    const tripDate = document.querySelector('input[type="date"]').value;
    
    // Alert for empty date field
    let tripDate_ms = 0;
    if (tripDate === '')
        alert('Invalid Date');
    else 
        tripDate_ms = new Date(tripDate).getTime();

    // Milliseconds in one day
    const oneday_ms = 24 * 60 * 60 * 1000;

    // Countdown days left to start of trip
    const countdown = Math.ceil((tripDate_ms - todayDate_ms) / oneday_ms);

    // Alert for trip date in the past
    if (countdown < 0) {
        alert('Trip date in the past');
        return 0;
    }
    else if (countdown > 6) {
        alert('Trip too far into the future');
        return 6;
    } else {
        return Math.abs(countdown);
    }
}

function handleSubmit(event) {
    event.preventDefault();

    // Get the location name from the text field
    const location_geonames = document.querySelector('input[type="text"]').value;
    
    // Get countdown days to start of trip
    const countdown = getCountdown();

    // Build the url to call Geonames API and store the response in an object
    let url_Geonames = '';
    let url_Weatherbit = '';
    let object_Geonames = {};
    let object_Weatherbit = {};
    getCredentialsForGeonames()
    .then(key => {
        url_Geonames = `http://api.geonames.org/postalCodeSearchJSON?placename=${location_geonames}&maxRows=10&username=${key.apiKey_Geonames}`;
    }).then(() => {
        callGeonames(url_Geonames)
        .then(data => data.json())
        .then(resp => object_Geonames = resp.postalCodes[0])
        .then(() => console.log(object_Geonames.lat, object_Geonames.lng))
        .then(() => {
            getCredentialsForWeatherbit()
            .then(key => {
                url_Weatherbit = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${object_Geonames.lat}&lon=${object_Geonames.lng}&key=${key.apiKey_Weatherbit}`;
            }).then(() => {
                callWeatherbit(url_Weatherbit)
                .then(data => data.json())
                .then(resp => object_Weatherbit = resp.data[countdown])
                .then(() => console.log(object_Weatherbit));
            });
        })
    });
}

export {getCredentialsForGeonames, callGeonames, handleSubmit};