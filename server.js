const express = require('express');
const logger = require('morgan');
require('colors');
const errorHandler = require('./middleware/error');

const { PORT, NODE_ENV } = require('./config/keys');

const connectDB = require('./config/db');

//Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

// connection to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// logging middleware
if (NODE_ENV === 'development') {
    app.use(logger('dev'));
}

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const server = app.listen(PORT || 5000, () => {
    console.log(`Server started in ${NODE_ENV} mode on port: ${PORT}`.yellow.bold);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});
