const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// const url = require('url');

const { verifyToken, apiLimiter } = require('./middlewares');
const {
  User, Post, Hashtag, Domain
} = require('../models');

const router = express.Router();

router.use(async (req, res, next) => {
  // https://stackoverflow.com/questions/59375013/node-legacy-url-parse-deprecated-what-to-use-instead
  const url = new URL(req.get('origin'));
  console.log(url);
  const domain = await Domain.findOne({
    where: { host: (url.host) } // url.parse is deprecated;
  });

  if (domain) {
    // 아래 두가지는 같은 작동이며 미들웨어를 커스터마이징하며 쓰기 위해서 사용하는 방식이 아래방식
    // router.use(cors())
    // router.use((req,res,next)=>{
    //   cors()(req,res,next);
    // })
    cors({
      // origin 속성에 허용할 도메인만 추가
      origin: req.get('origin'),
      credentials: true
    })(req, res, next);
  }
  else {
    next();
  }
});

router.post('/token', async (req, res) => {
  const { clientSecret } = req.body;

  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attributes: ['nick', 'id']
      }
    });

    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: '등록되지 않은 도메인입니다~ 등록해주세용'
      });
    }

    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30ms', // 30minutes
        issuer: 'Sanghun'
      }
    );

    return res.json({
      code: 200,
      message: '토큰이 발급 되었습니다.',
      token
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버에러'
    });
  }
});

router.get('/test', verifyToken, apiLimiter, (req, res) => {
  res.json(req.decoded);
});

router.get('/posts/my', apiLimiter, verifyToken, (req, res) => {
  Post.findAll({ where: { userId: req.decoded.id } })
    .then((posts) => {
      console.log(posts);
      res.json({
        code: 200,
        payload: posts
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: '서버에러!'
      });
    });
});

router.get(
  '/posts/hashtag/:title',
  verifyToken,
  apiLimiter,
  async (req, res) => {
    try {
      const hashtag = await Hashtag.findOne({
        where: { title: req.params.title }
      });

      if (!hashtag) {
        return res.status(404).json({
          code: 404,
          message: '검색결과가 없습니다..'
        });
      }

      const posts = await hashtag.getPosts();
      return res.json({
        code: 200,
        payload: posts
      });
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: '서버에러라네유'
      });
    }
  }
);

module.exports = router;
