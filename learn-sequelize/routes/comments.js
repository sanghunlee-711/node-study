const express = require("express");
const { User, Comment } = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  //댓글 생성
  try {
    const comment = await Comment.create({
      //id와 comment를 넣어 사용자와 댓글을 연결한다.
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router
  .route("/:id")
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update(
        {
          comment: req.body.comment,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      //id에 해당하는 데이터가 삭제되고 반환된 값을 result에 저장
      const result = await Comment.destroy({ where: { id: req.params.id } });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
