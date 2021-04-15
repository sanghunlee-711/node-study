//fs 모듈은 파일시스템에 접근하는 모듈로서 파일을 생성하거나 삭제, 읽거나 쓸 수 있다.

const fs = require("fs");

//node 명령어를 실행하는 콘솔기준에서 파일 경로를 불러온다
fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  //<Buffer eb 85 b... a4>
  //일단 버퍼를 메모리의 데이터라고 단순하게 생각하자.
  console.log(data.toString());
});

//fs는 기본적으로 콜백형식의 모듈이므로 실무에서 사용하기 불편하다. 그래서 프로미스형식으로 바꿔주는 방법을 사용한다.
