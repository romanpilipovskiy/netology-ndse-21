const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/upload');

const { Book, database } = require('../models/books');

console.log(database);

router.get('/', (req, res) => {
    const {books} = database;
    res.json(books);
});

router.get('/:id', (req, res) => {
    const {books} = database;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if( idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('Book not found!');
    }
});

router.get('/:id/download', (req, res) => {
    const {books} = database;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if( idx !== -1) {
        res.download(books[idx].fileBook);
    } else {
        res.status(404);
        res.json('Book not found!');
    }
});

router.post('/', fileUpload.single('file'), (req, res) => {
    const {books} = database;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, req.file.path || '');
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

router.put('/:id', fileUpload.single('file'), (req, res) => {
    const {books} = database;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;

    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1){
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook: req.file.path || ''
        };
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('Book not found!');
    }
});

router.delete('/:id', (req, res) => {
    const {books} = database;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
     
    if(idx !== -1){
        books.splice(idx, 1);
        res.json('ok');
    } else {
        res.status(404);
        res.json('Book not found!');
    }
});

module.exports = router;