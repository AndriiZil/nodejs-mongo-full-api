// load env variables
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, './config.env') });

if (dotenv.error) {
    throw new Error('.env file is not specified');
}

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    GEOCODER_PROVIDER: process.env.GEOCODER_PROVIDER,
    GEOCODER_API_KEY: process.env.GEOCODER_API_KEY,
}
