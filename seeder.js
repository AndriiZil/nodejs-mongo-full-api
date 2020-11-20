const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).catch(console.log);

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        // await Course.create(courses);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany({});
        await Course.deleteMany({});

        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

if (process.argv[2] === '-i') {
    importData().catch(console.log);
} else if (process.argv[2] === '-d') {
    deleteData().catch(console.log);
}
