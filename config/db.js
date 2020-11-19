const mongoose = require('mongoose');

const { MONGO_URI } = require('./keys');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: "${conn.connection.host}"`.cyan.underline.bold);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;
