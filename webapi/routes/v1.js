const express = require("express");
const jwt = require("jsonwebtoken");

const { verifyToken } = require("./middlewares");
const { Domain, User, Post, Hashtag } = require("../models");

const router = express.Router();

router.post("/token", async (req, res) => {
  const { clientSecret } = req.body;
  try {
    //유저 도메인 등록확인
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ["nick", "id"],
      },
    });
    console.log(domain);

    //없는 경우 에러 발생
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "등록되지 않은 도메인입니다. 먼저 도메인을 등록하세용",
      });
    }

    //sign메서드로 토큰 생성
    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRET, //비밀키
      {
        expiresIn: "1000m", //1minute, 유효기간
        issuer: "hoonhun", //발급자
      }
    );

    return res.json({
      code: 200,
      message: "토큰이 발급 되었습니다:)",
      token,
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: "서버에러",
    });
  }
});

router.get("/test", verifyToken, (req, res) => {
  res.json(req.decoded);
});

//내가 올린 게시글을 가져오는 라우터
router.get("/posts/my", verifyToken, (req, res) => {
  Post.findAll({ where: { userId: req.decoded.id } })
    .then((posts) => {
      console.log(posts);
      res.json({
        code: 200,
        payload: posts,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: "서버 에러",
      });
    });
});

//해시태그의 검색결과를 가져오는 라우터
router.get("/posts/hashtag/:title", verifyToken, async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({
      where: { title: req.params.title },
    });

    if (!hashtag) {
      return res.status(400).json({
        code: 404,
        message: "검색 결과가 없습니다.",
      });
    }

    const posts = await hashtag.getPosts();

    return res.json({
      code: 200,
      payload: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
});

module.exports = router;
