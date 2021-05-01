const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

//upload폴더 존재 여부 확인 및 생성
try {
  fs.readdirSync("uploads");
} catch (err) {
  console.error("uploads 폴더가 없으므로 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// /post/img라우터에서는 이미지 하나를 업로드 받은 뒤 이미지의 저장경로를 클라이언트로 응답
router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
  console.log(req.file);
  //이미지의 저장경로를 보내준다 (static 미들웨어가 /img경로의 정적파일을 제공하므로 클라이언트에서 제공한 이미지에 접근가능)
  res.json({ url: `/img/${req.file.filename}` });
});

// /post라우터는 게시글 업로드를 처리하는 라우터
const upload2 = multer();
//이미지 경로만 주고 실제 이미지를 주는 것이 아니기에 none메서드 사용
router.post("/", isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });

    //게시글 내용에서 해시태그를 정규표현식으로 추출해냄
    const hashtags = req.body.content.match(/#[^\s#]+/g);

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          //저장을 위해 findOrCreate메서드 사용
          //Db에 존재하면 가져오고 존재하지 않으면 생성 후 가져오는 메서드
          return Hashtag.findOrCreate({
            //해시태그문구에서 #을때고 소문자로 변경
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      //해시태그 모델들을 post.addHashtags메서드를 통해 게시글과 연결(시퀄라이즈에서 자동 생성해준 메서드임)
      //결과값으로 [모델, 생성여부]를 반환하므로 모델만 추출하기 위한 로직
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
