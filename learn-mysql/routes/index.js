const express = require("express");
const router = express.Router("/");

router.get("/", (req, res) => {
  res.send("여기는 메인 :)");
});

module.exports = router;
