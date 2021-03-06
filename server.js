const express = require('express');
const logger = require('morgan');
const path = require('path');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// Security
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const errorHandler = require('./middleware/error');

const { PORT, NODE_ENV } = require('./config/keys');

const connectDB = require('./config/db');

//Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

// connection to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// logging middleware
if (NODE_ENV === 'development') {
    app.use(logger('dev'));
}

// File uploader
app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Enable CORS
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);

const server = app.listen(PORT || 5000, () => {
    console.log(`Server started in ${NODE_ENV} mode on port: ${PORT}`.yellow.bold);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});
