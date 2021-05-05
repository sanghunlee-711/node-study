const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

// 로그인 여부 검사하는 미들웨어
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // possport에서 제공하는 req객체에는 isAuthenticated 메서드가 존재,
    // 로그인중이면 req.isAuthenticated()가 true이고 그렇지 않다면 false이다.
    next();
  }
  else {
    res.status(403).send('로그인 필요!!');
  }
};

// 로그인 하지 않은 여부 검사하는 미들웨어
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  }
  else {
    const message = encodeURIComponent('로그인한 상태입니다!');
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    // verify메서드를 통해 사용자가 헤더에 넣어 보낸 토큰을 인증할 수 있다.
    // 첫번째 인수로는 토큰을 두번째 인수로는 토큰의 비밀키를 넣는다.
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    return next();
  }
  catch (err) {
    console.error(err);
    // 일치하지 않는 비밀키이거나 유효기간이 지난 경우라면 catch문으로 이동하게 된다.
    if (err.name === 'TokenExpiredError') {
      // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다!'
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.'
    });
  }
};

exports.apiLimiter = new RateLimit({
  windowMs: 60 * 1000, // 기준시간
  max: 10, // 허용 횟수
  delayMs: 0, // 호출 간격
  handler(req, res) {
    // 제한 시간 초과 시 콜백 함수
    res.status(this.statusCode).json({
      code: this.statusCode, // 기본값은 429이다
      message: '1분에 한 번만 요청할 수 있습니다.'
    });
  }
});

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요'
  });
};
