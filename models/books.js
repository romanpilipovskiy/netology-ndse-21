const { v4: uuid } = require('uuid');

class Book {
    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", fileBook = "", id = uuid()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook
    }
};

const database = {
    books: [
        new Book(),
        new Book(),
        new Book()
    ],
};

module.exports = { Book, database };