const express = require("express");

const router = express.Router();

router.get("/pug", (req, res) => {
  res.render("main");
});

module.exports = router;
