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

//app.get("주소",라우터)는 주소에 대한 GET요청이 올 때 어떤동작을 할 지 적는 부분이다.
//매개 변수 req는 요청에 관한 정보가 들어있는 객체이고, res는 응답에 관한 정보가 들어있는 객체이다.
app.get("/", (req, res) => {
  //현재는 GET / 요청 시 응답으로 Hello Express를 전송한다.
  // res.send("Hello Express");
  res.sendFile(path.join(__dirname, "/index.html"));
  console.log(path);
  //해당 폴더까지의 경로가 저장된 변수인 __dirname
  console.log(__dirname);
});
//listen을 하는 부분은 포트를 연결하고 서버를 실행하면 되며 포트는 app.get("port")으로 들고 왔다.
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중!");
});
