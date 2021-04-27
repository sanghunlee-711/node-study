const express = require("express");
const User = require("../models/user");
const Comment = require("../models/comment");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    // '/user'주소로 get 요청 시 처리
    try {
      const users = await User.findAll();
      //json형태로 반환한다는 것이 '/'get 요청과의 차이이다.
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    // '/user'주소로 post 요청 시 처리
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get("/:id/comments", async (req, res, next) => {
  try {
    //findAll메서드에 include옵션이 추가 되었다.
    const comments = await Comment.findAll({
      include: {
        //include 옵션에서 model 속성에는 User모델을
        model: User,
        // where속성에는 :id로 받은 params값을 넣었다.
        where: { id: req.params.id },
      },
      //조회된 댓글 객체에는 include를 통해 넣어준 사용자정보도 들어 있으므로 작성자의 이름이나 나이가 조회 가능하다.
    });
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
