const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/upload");
const Book = require('../models/books');

router.get("/", async (req, res) => {
  const books = await Book.find().select('-__v');
  res.render("books/index", {
    title: "Книги",
    titleDetail: " | Просмотр книг",
    books: books,
  });
});

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Книги",
    titleDetail: " | Добавление книги",
    book: {},
  });
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id).select('-__v');

  if (book) {
    res.render("books/update", {
      title: "Книги",
      titleDetail: " | Редактирование книги",
      book: book,
    });
  } else {
    res.render("error", {
      title: "Ошибка",
      titleDetail: " | 404",
      errCode: "404",
      errDesc: "Книга, которую Вы хотели изменить, не существует.",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id).select('-__v');

  console.log(id, book);

  if (book) {
    res.render("books/view", {
      title: "Книга",
      titleDetail: ` | ${book.title}`,
      book: book,
    });
  } else {
    res.render("error", {
      title: "Ошибка",
      titleDetail: " | 404",
      errCode: "404",
      errDesc: "Книга, которую Вы ищите, не существует.",
    });
  }
});

router.post("/create", fileUpload.single("file"), async (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

    console.log(title, description, authors, favorite, fileCover, fileName)

  try {
    const newBook = new Book({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
  });
    await newBook.save();
    res.redirect("/books");
  } catch (e) {
    res.render("error", {
      title: "Ошибка",
      titleDetail: " | 500",
      errCode: "500",
      errDesc: `При создании книги возникла ошибка: ${e}`,
    });
  }
});

router.post("/update/:id", fileUpload.single("file"), async (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const { id } = req.params;

  const book = await Book.findById(id).select('-__v');

  if (book) {
    await Book.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName, fileBook: req.file ? req.file.path : "",});
    res.redirect(`/books`);
  } else {
    res.render("error", {
      title: "Ошибка",
      titleDetail: " | 404",
      errCode: "404",
      errDesc: "Книга, которую Вы хотели изменить, не существует.",
    });
  }
});

router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Book.deleteOne({_id: id});
    res.redirect("/books");
  } catch(err) {
    res.render("error", {
      title: "Ошибка",
      titleDetail: " | 404",
      errCode: "404",
      errDesc: "Книга, которую Вы хотели удалить, не существует.",
    });
  }
});

module.exports = router;


