const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  //res. locals property is an object that contains response local variables scoped to the request
  //,it's only available to the views rendered during that request/response cycle (if any).
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerList = [];
  next();
});

router.get("/profile", (req, res) => {
  res.render("profile", { title: "MY INFORMATION - SANGHUNLEE" });
});

router.get("/join", (req, res) => {
  res.render("join", { title: "SIGN IN - SANGHUNLEE" });
});

router.get("/", (req, res, next) => {
  const twits = [];
  res.render("main", {
    title: "NodeBird",
    twits,
  });
});

module.exports = router;
