const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

//./models/index.js를 가져오는 것
const { sequelize } = require("./models");

const app = express();
app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

//sequelize를 가져와서 sync메서드를 사용해 서버 실행 시 mysql과 연동되도록 설정
sequelize
  .sync({ force: false }) // true일 경우 서버 실행 시 마다 테이블 재생성
  .then(() => {
    //config.json에 존재하는 password를 설정해주자
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  //production모드 유지를 위함
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중!");
});
