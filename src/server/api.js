import { getKey_Geonames } from './api_Geonames.js';

// Configure path
import path from 'path';
import { fileURLToPath } from 'url';

// Configure dotenv
import dotenv from 'dotenv';
dotenv.config();

// Configure express app
import express from 'express';
const app = express();

// Configure middleware
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configure cors
import cors from 'cors';
app.use(cors());

// Initialise main project folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../../dist')));

// Configure GET routes
app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: path.join(__dirname, '../../dist')});
});

app.get('/apiKey_Geonames', getKey_Geonames);

const apiKey_Weatherbit = process.env.API_KEY_WEATHERBIT;
app.get('/apiKey_Weatherbit', (req, res) => {
    res.send({apiKey_Weatherbit});
});

const apiKey_Pixabay = process.env.API_KEY_PIXABAY;
app.get('/apiKey_Pixabay', (req, res) => {
    res.send({apiKey_Pixabay});
});

export {getKey_Geonames};
export default app;