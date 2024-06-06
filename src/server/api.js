// Configure dotenv
const dotenv = require('dotenv');
dotenv.config();

const apiKey_Geonames = process.env.API_KEY_GEONAMES;

function getKey_Geonames(req, res) {
    res.send({apiKey_Geonames});
}

export { getKey_Geonames };