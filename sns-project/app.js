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
const authrouter = require("./routes/auth");
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
app.use("/auth", authrouter);
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

app.listen(app.get("port"), (req, res) => {
  console.log(app.get("port"), "번에서 대기중");
});
