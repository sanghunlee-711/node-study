const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; //로그인 구현을 위해서 passport-local모듈에서 Strategy생성자를 불러와 그안에서 구현하면 된다.
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        //로그인 전략ㄱ에 관한 설정을 하는 곳이다
        //각 filed의 값과 일치하는 로그인 라우터의 req.body속성명을 적으면 된다.
        //req.body.email에 이메일 주소가 오고 req.body.password에는 비밀번호가 오므로 아래와 같이 기입한다.
        usernameField: "email",
        passwordField: "password",
      },
      //실제 수행을 하는 곳 done함수는 passport.authenticate의 콜백함수이다.
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } }); //User모델에서 email갑ㅅ과 대조하여 확인
          if (exUser) {
            //db에 존재한다면 compare함수로 비교한다.
            const result = await bcrypt.compare(password, exUser.password);

            if (result) {
              //일치한다면 done함수의 두번째 인자로 사용자 정보를 넘겨준다 done함수의 첫번째 인자를 사용하는 경우는 서버쪽 에러가 발생했을 때,
              //두번째 인수를 사용하지 않는 경우는 로그인 실패 시
              //세번째 인수는 로그인 처리 과정에서 비밀번호 미일치 또는 미존재 회원 존재 같은 사용자 정의 에러 발생시 사용한다.
              //done이 호출된 후 다시 passport.authenticate의 콜백함수에서 나머지 로직이 실행된다.
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다 :(" });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다.." });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
