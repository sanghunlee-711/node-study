const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID, //cliendId는 카카오에서 발급해주는 id로 노출되지 않아야 해서 process.env에 저장한다
        callbackURL: "/auth/kakao/callback", //카카오로부터 인증 결과를 받을 라우터 주소이다.
      },
      async (acessToken, refreshToken, profile, done) => {
        console.log("kakao Profile", profile);

        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });

          if (exUser) {
            done(null, exUser);
          } else {
            //존재하지 않는 회원이라면 회원가입을 진행한다.
            const newUser = await User.create({
              //카카오에서는 인증 후 callbackURL에 적힌 주소로 accessToken, profile등을 보낸다.
              //profile객체에는 사용자 정보들이 들어있다.
              email: profile._json && profile._json.kaccount_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            //사용자 생성 후 done함수 호출
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(error);
        }
      }
    )
  );
};
