const express = require('express');
const logger = require('./middleware/logger');
const error404 = require('./middleware/error404');
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use(logger);

app.use('/', indexRouter);
app.use('/books', booksRouter);

app.use(error404);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});