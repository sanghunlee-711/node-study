//express모듈을 실행해 app변수에 할당한다.
//express 내부에 Http모듈이 내장되어 있으므로 서버의 역할을 할 수 있다.
const express = require("express");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//dotenv 패키지는 .env 파일을 읽어서 process.env로 변경한다.
const dotenv = require("dotenv");
//파일 경로 지정을 위해 path모듈 사용
const path = require("path");
//body-parser는 요청의 본문에 있는 데이터를 해석해서 req.body객체로 만들어 주는 미들웨어이고 보통 폼데이터나 AJAX요청의 데이터를 처리한다.
//단 멀티파트(이미지, 동영상, 파일 등)의 데이터는 처리하지 못하며 이는 multuer모듈을 사용하면 된다.
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
//app.set("port", 포트)로 서버가 실행될 포트를 설정한다.
//process.env객체에 PORT 속성이 있다면 그 값을 사용하고, 없다면 기본 값으로 3000번 포트를 이용하도록 되어있다!
//이렇게 app.set("키","값")으로 데이터를 저장할 수 있다.
//이 데이터를 나중에 app.get(키)로 가져올 수 있다.
app.set("port", process.env.PORT || 3000);

//설치했던 패키지들을 아래에 연결한다
//app.use에 연결할 때 req,res,next 같은 것들이 보이지 않지만 미들웨어 내부에 들어있는 것이다.
//next도 내부적으로 호출하기에 다음 미들웨어로 넘어갈 수 있다.

//morgan 패키지는 요청과 응답에 대한 정보를 콘솔에 기록한다.
app.use(morgan("dev"));
//... GET / 500 9.739 ms - 35 는 morgan 미들웨어에서 나오는 것이다.
//옵션 중 dev와 combinde, short등이 있는데 보통은 개발에서 dev를 , 배포환경에서는 combined를 사용한다고 한다.
//[HTTP 메서드][주소][HTTP상태코드][응답속도]-[응답바이트]의 형태이다
//요청과 응답에 대한 정보를 콘솔에 기록하게 된다.

//static 미들웨어는 정적인 파일들을 제공하는 라우터 역할을 한다. 기본제공이기에 따로 설치필요 없이 express객체 안에서 꺼내 장착하면 된다.
//app.use(요청경로, express.static("실제경로"))
//예를들어 public/stylesheet/style.css -> https://localhost:3000/stylesheet/style.css로 접근할 수 있다.
//public폴더를 만들고 css,js,img를 넣으면 브라우저에서 접근이 가능해진다
//만약 파일이 없으면 알아서 내부적으로 next를 호출하고 파일을 발견했다면 next를 호출하지 않고 파일을 보내게 되므로 다음 미들웨어는 실행되지 않는다
app.use("/", express.static(path.join(__dirname, "public")));

//body-parser는 요청의 본문에 있는 데이터를 해석해서 req.body객체로 만들어 주는 미들웨어이고 보통 폼데이터나 AJAX요청의 데이터를 처리한다.
//단 멀티파트(이미지, 동영상, 파일 등)의 데이터는 처리하지 못하며 이는 multuer모듈을 사용하면 된다.
//기본적으로 4.16.0 버전부터 json, urlencoded는 내장되어 있고 text,raw데이터를 추가로 해석하기 위해서는 설치를 해야한다
//Raw는 요청의 본문이 버퍼 데이터 일때, Text는 텍스트 데이터일 때 해석하는 미들웨어이다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.text());

//process.env.COOKIE_SECRET에 cookiesecret 값이 할당된다.
//키 = 값 형식으로 추가하면 된다. process.env를 별도의 파일로 관리하는 이유는 보안과 설정의 편의성 때문이다.
//cookieParser는 요청에 동봉된 쿠키를 해석해 req.cookie 객체로 만든다. 4.3절의 parseCookie 함수와 기능이 비슷하다.
//  //{ 'ch-veil-id': 'b1f5def4-1d8f-4701-b173-a00f576ecde2' } 이렇게 req.cookies를 찍으면 나오는 것을 볼 수 있다.

app.use(cookieParser({ name: "sanhunlee" }));

//서명된 쿠키가 있는 경우 내 서버가 만든 쿠키임을 검증할 수 있다.
//쿠키는 클라이언트에서 위조하기 쉬우므로 비밀키를 통해 만들어낸 서명을 쿠키값 뒤에 붙인다
//서명이 붙으면 name=sanghun.sign과 같은 모양이 된다.
//서명이 된 쿠키는 req.cookies대신 req.signedCookies에 있다.
// app.use((req, res, next) => {
//   //쿠키생성을 위해서는 res.cookie()
//   res.cookie("name", "sanghunLee", {
//     expires: new Date(Date.now() + 900000),
//     httpOnly: true,
//     secure: true,
//   });

//   //쿠키삭제를 위해서는 res.cleaerCooke()
//   //쿠키를 지우기 위해서는 키와 값 외에도 옵션값이 정확히 일치해야한다.
//   //signed라는 옵션이 존재하는데 이를 true로 설정하면 쿠키 뒤에 서명이 들어가므로 대부분의 경우 서명옵션을 켜두는 것이 좋다.
//   //서명을 위한 비밀 키는 cookieParser 미들웨어에 인수로 넣은 process.env.COOKIE_SECRET이 된다.
//   res.clearCookie("name", "sanghunLee", {
//     httpOnly: true,
//     secure: true,
//   });
// });
app.use(cookieParser(process.env.COOKIE_SECRET));
//세션 관리용 미들웨어이며 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장할 때 유용하다.
//세션은 사용자 별로 req.session객체 안에 유지된다.
//1.5버전 이전에는 내부적으로 cookie-parser를 사용하고 있어 cookie-parser미들웨어보다 뒤에 배치해야했지만,
//1.5버전 이후로부터는 사용하지 않게 되어 순서가 상관 없어졌다.
//하지만 버전에 따라 위험이 있기에 cookie-parser미들웨어보다 뒤에 놓는 것이 좋다.
app.use(
  session({
    //resave는 요청이 올 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 설정하는 것.
    resave: false,
    //saveUninitialized는 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것이다.
    saveUninitialized: false,
    //안전하게 쿠키를 서명하는데 secret의 값이 필요하고 cookie-parser의 secret과 '같게' 설정하는 것이 좋다.
    secret: process.env.COOKIE_SECRET,
    //express session은 세션 관리 시 클라이언트에 쿠키를 보내는데 세션쿠키가 이것이다.
    cookie: {
      //쿠키 옵션은 sessioncookie에 대한 설정이며 sameSite httpOnly, secure 등 일반적인 쿠키옵션이 모두 제공된다.
      //httpOnly옵션을 true로 설정 시 클라이언트에서 쿠키를 확인하지 못하게 되고
      httpOnly: true,
      //secure옵션을 false로 하여 https가 아닌 다른환경에서도 사용할 수 있게 되었다.
      //배포시에는 true로 하여 https를 적용하는 것이 좋다.
      secure: false,
      //추가로 store라는 옵션도 존재하는데 메모리에 세션을 저장하는 것이 아닌 DB를 store에 연결하여 세션을 유지하는 방식이다(그렇지 않으면 서버 재 시작시 메모리가 초기화 되므로)
    },
    //세션쿠키의 이름은 name 옵션으로 설정한다.
    //기본값은 connect.sid이다.
    name: "session-cookie",
  })
);

const multer = require("multer");
const fs = require("fs");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads폴더가 없어 uploads폴더를 생성합니다");
  fs.mkdirSync("uploads");
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});

app.post(
  "/upload",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send("ok");
  }
);

//주소를 첫번째 인수로 넣어주지 않으면 미들웨어는 모든요청에서 실행되고, 주소를 넣는다면 해당하는 요청에서만 실행된다고 보면된다.
// app.use((req, res, next) => {
//   console.log("모든 요청에 다 실행됩니다.");
//   console.log("@@@");
//   console.log(req.cookies);
//   console.log("@@@@");
//   next();
// });

app.get(
  "/",
  //첫번째 미들웨어
  (req, res, next) => {
    console.log("GET/ 요청에서만 실행됩니다.");
    next();
    //두번째 미들웨어
    //여기서 발생한 에러는 아래 app.use로 적용된 미들웨어에서 처리하게 된다.
  },
  (req, res) => {
    throw new Error("에러는 에러처리 미들웨어로 갑니다!");
  }
);

//미들웨어 사용을 위한 use메서드
//미들웨어는 위에서부터 아래로 순서대로 실행되면서 요청과 응답사이에 특별한 기능을 추가할 수 있다.
//next라는 세번째 매개변수는 다음 미들웨어로 넘어가기 위한 함수이다(js generator를 생각해보자)
//next를 실행하지 않으면 다음 미들웨어가 실행되지 않는다.
app.use((err, req, res, next) => {
  //에러처리 미들웨어는 err, req, res, next 네가지 매개변수를 꼭 받아야한다
  console.error(err);
  //err는 에러에 관한정보,
  //res.status를 사용하면 HTTP상태코드를 지정할 수 있다.
  res.status(500).send(err.message);
});

//listen을 하는 부분은 포트를 연결하고 서버를 실행하면 되며 포트는 app.get("port")으로 들고 왔다.
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중!");
});

//app.use(미들웨어) 모든요청에서 실행되는 미들웨어
//app.use("/abc", 미들웨어) abc로 시작하는 요청에서 미들웨어 실행
//app.post("/abc", 미들웨어) abc로 시작하는 POST요청에서 미들웨어 실행
