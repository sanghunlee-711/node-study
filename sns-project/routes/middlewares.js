//로그인 여부 검사하는 미들웨어
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    //possport에서 제공하는 req객체에는 isAuthenticated 메서드가 존재,
    //로그인중이면 req.isAuthenticated()가 true이고 그렇지 않다면 false이다.
    next();
  } else {
    res.status(403).send("로그인 필요!!");
  }
};

//로그인 하지 않은 여부 검사하는 미들웨어
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다!");
    res.redirect(`/?error=${message}`);
  }
};
