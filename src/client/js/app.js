async function getCredentials(website) {
    const api = '/apiKey_' + website;
    const response = await fetch(api);
    try {
        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function callWebsite(url) {
    const response = await fetch(url);
    try {
        const data = response.json();
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
        alert('Trip date in the past. Assuming trip today.');
        return 0;
    }
    else if (countdown > 6) {
        alert('Trip too far into the future. Assuming trip 7 days from today.');
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

    // Build the url to call Geonames API and store the response in the Geonames object
    // Build the url to call Weatherbit API and store the response in the Weatherbit object
    let url_Geonames = '';
    let url_Weatherbit = '';
    let object_Geonames = {};
    let object_Weatherbit = {};
    getCredentials('Geonames')
    .then(key => {
        url_Geonames = `http://api.geonames.org/postalCodeSearchJSON?placename=${location_geonames}&maxRows=10&username=${key.apiKey_Geonames}`;
    }).then(() => {
        callWebsite(url_Geonames)
        .then(resp => object_Geonames = resp.postalCodes[0])
        .then(() => console.log(object_Geonames.lat, object_Geonames.lng))
        .then(() => {
            getCredentials('Weatherbit')
            .then(key => {
                url_Weatherbit = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${object_Geonames.lat}&lon=${object_Geonames.lng}&key=${key.apiKey_Weatherbit}`;
            }).then(() => {
                callWebsite(url_Weatherbit)
                .then(resp => object_Weatherbit = resp.data[countdown])
                .then(() => console.log(object_Weatherbit))
                .then(() => {
                    // Add a weather icon
                    document.querySelector('img.weather').src = `https://cdn.weatherbit.io/static/img/icons/${object_Weatherbit.weather.icon}.png`;
                    document.querySelector('p.countdown').innerHTML = `${countdown} day(s) left for the trip`;
                    document.querySelector('p.weather').innerHTML = `Weather on ${object_Weatherbit.valid_date}: ${object_Weatherbit.weather.description}`
                }).catch(error => console.log(error));
            }).catch(error => console.log(error));
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));

    // Build the URL to call Pixabay API and store the response in the Pixabay object
    let url_Pixabay = '';
    let object_Pixabay = {};
    getCredentials('Pixabay')
    .then((key) => {
        url_Pixabay = `https://pixabay.com/api/?key=${key.apiKey_Pixabay}&q=${location_geonames}&image_type=photo&category=places&orientation=horizontal`;
        url_Pixabay = encodeURI(url_Pixabay);
    }).then(() => {
        callWebsite(url_Pixabay)
        .then(resp => object_Pixabay = resp.hits[0])
        .then(() => console.log(object_Pixabay))
        .then(() => {
            if (object_Pixabay !== undefined)
                document.querySelector('img.location').src = object_Pixabay.largeImageURL;
            else
                document.querySelector('img.location').src = 'https://picsum.photos/1280/720';
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export {getCredentials, callWebsite, handleSubmit};