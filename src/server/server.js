// Configure path
const path = require('path');

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
app.use(express.static(path.join(__dirname, '../client')));

// Start server
const server = app.listen(8000, () => {
    console.log('Server started at localhost:8000');
})

// Configure GET routes
app.get('/', (req, res) => {
    res.sendFile('views/index.html', {root: path.join(__dirname, '../client')});
});