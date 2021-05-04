const express = require("express");

const { isLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    //follow할 유저를 DB에서 조회한다
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      //유저가 DB에 존재하면 addFollowing메서드로 현재 로그인한 사용자와의 관계를 지정해준
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("successs");
    } else {
      res.status(404).send("No User");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/:id/destroy", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10));
      res.send("Delete Follow");
    } else {
      res.status(404).send("No User For Destroying Follow");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
