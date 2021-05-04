const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/test", async (req, res, next) => {
  //토큰 테스트 라우터
  try {
    if (!req.session.jwt) {
      //세션에 토큰 없을 시
      const tokenResult = await axios.post("http://localhost:8002/v1/token", {
        clientSecret: process.env.CLIENT_SECRET,
      });
      //토큰 발급 성공
      if (tokenResult.data && tokenResult.data.code === 200) {
        //세션에 토큰 저장
        req.session.jwt = tokenResult.data.token;
      } else {
        //토큰 발급 실패
        return res.json("tokenResult.data");
      }
    }

    //발급받은 토큰 테스트
    const result = await axios.get("http://localhost:8002/v1/test", {
      headers: { authorization: req.session.jwt },
    });

    return res.json(result.data);
  } catch (err) {
    console.error(err);

    if (err.response.status === 419 || err.response.status === 404) {
      //토큰 만료일 때
      return res.json(err.response.data);
    }

    return next(err);
  }
});

module.exports = router;
