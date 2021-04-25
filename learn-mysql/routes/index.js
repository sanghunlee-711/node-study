const express = require("express");
const router = express.Router("/");
const path = require("path");

router.get("/", (req, res) => {
  const newPath = path.join(__dirname, "..", "views/index.html");

  res.sendFile(newPath);
});

module.exports = router;
