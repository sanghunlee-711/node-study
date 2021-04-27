const express = require("express");
const User = require("../models/user"); //User 테이블

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll(); // User테이블 다 가져옴 -> 모든 사용자 찾아옴
    //json 형태 전송이 아니다
    res.render("sequelize", { users }); //sequelize.html렌더링 시 결과값인 users를 주입
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
