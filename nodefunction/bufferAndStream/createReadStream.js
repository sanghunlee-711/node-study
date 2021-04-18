const fs = require("fs");

//createReadStream으로 읽기 스트림을 만든다(버퍼를 쪼개보자!)
//첫번째 인자로는 파일 경로, 두번째 인수로는 옵션객체 중 highWaterMark라는 옵션을 통해서 버퍼의 크기(바이트단위)를
// 정할 수 있다.
//기본값이 64KB이지만, 여러번 나눠서 보내는 모습을 보이기 위해 16으로 진행
const readStream = fs.createReadStream("./readme3.txt", { highWaterMark: 16 });
const data = [];

//readStream은 보통 이벤트리스너랑 붙여서 사용한다.
//보통 data, end ,error 와 붙여서 사용한다.
readStream.on("data", (chunk) => {
  //파일 읽기 시작하면 data 이벤트 발생
  //기본 값을 16바이트로 설정했으므로 그것보다 크면 이벤트가 여러번 발생할 수 있음
  data.push(chunk);
  console.log("data:", chunk, chunk.length);
});

readStream.on("end", () => {
  //파일읽기 끝나면 end이벤트 발생
  //미리 data배열을 만들어놓고 들어오는 chunk들을 하나씩 push한 뒤 마지막에
  //Buffer.concat()을 이용해서 데이터를 합쳐 문자열로 변경함.
  console.log("end: ", Buffer.concat(data).toString());
});

readStream.on("error", (error) => {
  //에러 발생시 error이벤트 발생
  console.log("error", error);
});
