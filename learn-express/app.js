//express모듈을 실행해 app변수에 할당한다.
//express 내부에 Http모듈이 내장되어 있으므로 서버의 역할을 할 수 있다.
const express = require("express");
//파일 경로 지정을 위해 path모듈 사용
const path = require("path");

const app = express();
//app.set("port", 포트)로 서버가 실행될 포트를 설정한다.
//process.env객체에 PORT 속성이 있다면 그 값을 사용하고, 없다면 기본 값으로 3000번 포트를 이용하도록 되어있다!
//이렇게 app.set("키","값")으로 데이터를 저장할 수 있다.
//이 데이터를 나중에 app.get(키)로 가져올 수 있다.
app.set("port", process.env.PORT || 3000);

//주소를 첫번째 인수로 넣어주지 않으면 미들웨어는 모든요청에서 실행되고, 주소를 넣는다면 해당하는 요청에서만 실행된다고 보면된다.
app.use((req, res, next) => {
  console.log("모든 요청에 다 실행됩니다.");
  next();
});

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
