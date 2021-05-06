const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport"); // 서비스를 이용할 수 있게 해주는 여권같은 역할

dotenv.config(); //for setting .env file
const pageRouter = require("./routes/page"); //setting for pageRouter ;
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const { sequelize } = require("./models");
const passportConfig = require("./passport"); //./passport/index.js와 같다

const app = express(); // make express app;
passportConfig(); // passport Setting
app.set("port", process.env.PORT || 2021); //save port setting at express instance obj for using 'port' with get method
app.set("view engine", "html"); //nunjucks template engine setting
nunjucks.configure("views", {
  //nunjucks template engine setting
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev")); //use morgan for dev setting
app.use(express.static(path.join(__dirname, "public"))); // static file route setting
app.use("/img", express.static(path.join(__dirname, "uploads"))); //업로드할 이미지를 제공할 /img라우터를 express.static 미들웨어로 upload폴더와 연결
app.use(express.json()); //set middleware for using only json type when requesting with header data
app.use(express.urlencoded({ extended: false })); // set middleware for adopting url encoded type when headers set
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize()); //req 객체에 passport 설정을 함
app.use(passport.session()); //req session 객체에 passport 정보를 저장한다.
//req.session객체는 express-session에서 생성하는 것이므로 passport 미들웨어는 express-session미들웨어 뒤에 연결해야한다.

app.use("/", pageRouter); //use pageRouter
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

//error middleware setting
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
