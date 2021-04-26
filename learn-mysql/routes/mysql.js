const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("여기는 mysql site");
});

module.exports = router;
