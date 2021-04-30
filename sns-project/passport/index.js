const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); //여기서 로그인 사용자 정보중 id를 세션에 저장
  });
  //로그인 시 실행 되며 req.session(세션) 객체에 어떤 데이터를 저장할지 정하는 메서드 : serializeUser
  //매개변수로 user를 받고나서 , done함수에 두번 째 인수로 user.id를 넘기고 있다. user객체에는 사용자 정보가 들어있다고 생각하자.
  //done 함수의 첫번째 인수는 에러 발생시 사용, 두번째 인수에는 저장하고 싶은 데이터를 세션에 저장한다. 세션에 사용자 정보를 모두 저장하면 용량이 너무 커지므로 id만 저장

  passport.deserializeUser((id, done) => {
    User.findOne({ where: id })
      .then((user) => done(null, user)) //여기서 req.user에 저장
      .catch((err) => done(err));
  });
  //deserializeUser는 serializeUser와 다르게 로그인 시에만 실행되는 것이 아닌 매 요청시 실행된다.
  //passport.session미들웨어가 이 메서드를 호출 하고 serializeUser의 done의 두번째 인수로 넣었던 데이터가 deserializeUser의 매개변수가 된다. -> 여기서는 사용자의 아이디이다.
  //serializeUser를 통해 세션에 저장하였던 아이디를 받아 데이터베이스에서 사용자 정보를 조회한다. 조회한 정보를 req.user에 저장하므로 앞으로는 req.user를 통해 로그인한 사용자의 정보를 가져올 수 있다.

  local();
  kakao();
};
