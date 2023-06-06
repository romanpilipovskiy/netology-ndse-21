const express = require("express");
const router = express.Router();
const axios = require('axios');
const fileUpload = require("../middleware/upload");

const COUNTER_URL = process.env.COUNTER_URL || 'localhost';

const { Book, database } = require("../models/books");

console.log(database);

router.get("/", (req, res) => {
  const { books } = database;

  if (books.length) {
    books.forEach(async (el) => {
      await axios({
        method: 'get',
        url: `${COUNTER_URL}/counter/${el.id}`
      }).then((result) => {
        el.count = result.data.count;
      })
    });
  }

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

router.get("/update/:id", (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.render("books/update", {
      title: "Книги",
      titleDetail: " | Редактирование книги",
      book: books[idx],
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
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    await axios({
      method: 'post',
      url: `${COUNTER_URL}/counter/${books[idx].id}/incr`
    }).then((result) => {
      res.render("books/view", {
        title: "Книга",
        titleDetail: ` | ${books[idx].title}`,
        count: result.data.count,
        book: books[idx],
      });
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

router.post("/create", fileUpload.single("file"), (req, res) => {
  const { books } = database;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  console.log(req.body);

  try {
    const newBook = new Book(
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
    );
    books.push(newBook);
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

router.post("/update/:id", fileUpload.single("file"), (req, res) => {
  const { books } = database;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const { id } = req.params;

  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook: req.file ? req.file.path : "",
    };
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

router.post("/delete/:id", (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.redirect("/books");
  } else {
    res.render("error", {
      title: "Ошибка",
      titleDetail: " | 404",
      errCode: "404",
      errDesc: "Книга, которую Вы хотели удалить, не существует.",
    });
  }
});

module.exports = router;
