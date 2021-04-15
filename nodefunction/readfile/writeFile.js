const fs = require("fs").promises;

//writeFile을 기준 경로로 하여 writeme.txt파일과 내부 내용이 생성
fs.writeFile("./writeme.txt", "글이 입력됩니다.")
  .then(() => {
    //생성이 완료되면 fullfill상태에서 파일을 읽는 것을 실행
    return fs.readFile("./writeme.txt");
  })
  .then((data) => {
    //buffer
    //읽는것을 실행하고 받은 buffer형태의 데이터를 읽을 수 있는 문자열로 변경
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
