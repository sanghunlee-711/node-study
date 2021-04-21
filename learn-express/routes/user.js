const express = require("express");

const router = express.Router();

// Get '/user' Router
router.get("/user", (req, res) => {
  res.send("HEllo User!");
});

router.get("/user/:id", (req, res) => {
  // res.send(` HEllo User! your query is: ${req.params.query.test}`);
  console.log(req.query.limit);

  if (req.query.test) {
    return res.send(` HEllo User! your query is: ${req.query.test}`);
  }
  return res.send(
    ` HEllo User! your params id is: ${req.params.id} for the query test query start with id(test)`
  );
});

module.exports = router;
