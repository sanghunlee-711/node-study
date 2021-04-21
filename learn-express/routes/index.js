const express = require("express");

const router = express.Router();

//Get / Router
router.get("/", (req, res) => {
  res.send("Hello, Express");
});

module.exports = router;
