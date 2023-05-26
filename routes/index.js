const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Приложение БАЗА КНИГ", titleDetail: ""});
});

module.exports = router;
