const express = require('express');
const mongoose = require('mongoose');
const booksInit = require('./models/init');
const logger = require('./middleware/logger');
const error404 = require('./middleware/error404');
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use(logger);

app.use('/', indexRouter);
app.use('/books', booksRouter);

app.use(error404);

const PORT = process.env.PORT || 3000;

const URL_DB = process.env.URL_DB;

async function start(PORT, URL_DB) {
    try {
        await mongoose.connect(URL_DB);
        await booksInit();
        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

start(PORT, URL_DB);

