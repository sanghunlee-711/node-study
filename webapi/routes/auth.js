const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

//auth/join 라우터에 해당하며 회원가입 라우터 이다.
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ whrer: { email } }); //같은 이메일 db에서 조회
    //같은 이메일로 가입했다면 존재한다는 주소로 리다이렉트 시킴
    if (exUser) {
      //에러는 쿼리스트링으로 표시
      return res.redirect("/join?error=exist");
    }

    //비밀번호를 해쉬로 저장하고 DB에 저장한다.
    const hash = await bcrypt.hash(password, 12); //hash메서드의 두번째 인자는 반복횟수와 비슷한 기능으로 큰 숫자일 수록 더욱 암호화된다? 더욱 복잡해진다(시간도 더걸림 12이상 추천)
    await User.create({
      email,
      nick,
      password: hash,
    });
    //DB 저장후 메인페이지로 redirect
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

//auth/login에 해당하는 로그인 라우터
router.post("/login", isNotLoggedIn, (req, res, next) => {
  //로그인 요청 시 passport.authenticate("local")미들웨어가 로컬 로그인 전략을 수행한다.
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      //authErr값이 존재한다면 실패한 것이다
      console.error(authError);
      return next(authError);
    }

    //두번째 매개변수값이 없다면 실패이다
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }

    //두번째 매개변수값이 존재하는 경우 req.login 메서드를 호출한다.
    return req.login(user, (loginError) => {
      //passport객체는 req객체에 기본적으로 login, logout메서드를 추가하는데 req.login은 possport.serializeUser를 호출한다.
      //req.login에 제공하는 user객체가 serializeUser로 넘어가게 되는 것이다.

      //에러처리
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next); //미들웨어 내의 미들웨어에는 (req,res,next) 를 붙인다고 한다..??
});

//로그아웃 라우터
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy(); //로그아웃시 req.session객체의 내용을 제거한다.
  res.redirect("/"); //세션정보를 지운 후 메인페이지로 돌아간다.
});

// /auth/kakao로 접근하면 카카오 로그인 과정이 실행된다.
// 처음에는 카카오 로그인창으로 리다이렉트가 될 것이고 그창에서 로그인 성공여부 결과를 /auth/kakao/callback에서 받을 것이다.
//로컬로그인과는 다르게 authenticate메서드에 콜백함수를 제공하지 않는다. -> 카카오 로그인은 성공시 내부적으로 req.login을 호출하기 때문
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
