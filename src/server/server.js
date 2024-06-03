// Configure path
const path = require('path');

// Configure dotenv
const dotenv = require('dotenv');
dotenv.config();

// Configure express app
const express = require('express');
const app = express();

// Configure middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configure cors
const cors = require('cors');
app.use(cors());

// Initialise main project folder
app.use(express.static(path.join(__dirname, '../../dist')));

// Start server
const server = app.listen(8000, () => {
    console.log('Server started at localhost:8000');
})

// Configure GET routes
app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: path.join(__dirname, '../../dist')});
});

const apiKey_Geonames = process.env.API_KEY_GEONAMES;
app.get('/apiKey_Geonames', (req, res) => {
    res.send({apiKey_Geonames});
});

const apiKey_Weatherbit = process.env.API_KEY_WEATHERBIT;
app.get('/apiKey_Weatherbit', (req, res) => {
    res.send({apiKey_Weatherbit});
});

const apiKey_Pixabay = process.env.API_KEY_PIXABAY;
app.get('/apiKey_Pixabay', (req, res) => {
    res.send({apiKey_Pixabay});
});