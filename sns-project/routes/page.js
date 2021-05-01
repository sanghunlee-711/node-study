const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User } = require("../models");

const router = express.Router();

router.use((req, res, next) => {
  //res. locals property is an object that contains response local variables scoped to the request
  //,it's only available to the views rendered during that request/response cycle (if any).
  res.locals.user = req.user; //nunjucks에서 user객체를 통해 사용자 정보에 접근할 수 있게 만들기 위해 등록
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerList = [];
  next();
});

//자신의 프로필은 로그인을 해야 볼 수 있도록 isLoggedIn 미들웨어를 사용
//req.isAuthenticated()가 true여야 next가 호출 되어 res.render메서드가 존재하는 미들웨어로 넘어갈 수 있게 된다.
//false라면 로그인 창이 있는 메인페이지로 redirect된다.
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { title: "MY INFORMATION - SANGHUNLEE" });
});

//회원 가입은 로그인을 하지 않은 사람에게만 보여야 하므로 isNotLoggedIn 미들웨어로 req.isAuthenticated()가 false일때만 next를 호출하도록 했다.
router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", { title: "SIGN IN - SANGHUNLEE" });
});

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });

    res.render("main", {
      title: "NodeBIIIRDD",
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
