const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDB();

const prescriptions = require('./routes/prescriptions');

const app = express();

app.use(express.json());

app.use('/api/v1/prescriptions', prescriptions);

app.get('/', (req, res) => {
    res.send('Hello')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

