const fs = require("fs");

console.log("시작");
fs.readFile("./readme2.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("1번", data.toString());
});

fs.readFile("./readme2.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("2번", data.toString());
});

fs.readFile("./readme2.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("3번", data.toString());
});

console.log("끝");

//비동기 메서드들은 백그라운드에 해당 파일을 읽으라고만 요청하고 다음작업으로 넘어가기 때문에
//시작과 끝이 먼저 찍히고 나중에 읽기가 완료되면 백그라운드가 다시 메인스레드에 알리고 그제서야 등록된 콜백함수를 실행하는 방식이다.

//수백개의 I/O 요청이 들어와도 메인스레드는 백그라운드에 요청처리를 위임하기에 얼마든지 요청을 받을 수 있게 되고
//나중에 백그라운드가 각각의 요청처리가 완료되었다고 알리면 그 때 콜백함수를 처리하면 되기 때문이다

//백그라운드에서는 요청 세개를 거의 동시에 실행한다.

//동기와 비동기는 "백그라운드 작업완료 확인 여부 판단"
//블로킹과 논 블로킹 "함수가 바로 return되는지 여부 판단"

//node에서는 동기-블로킹 방식과 비동기-논블로킹 방식이 대부분
//동기-블로킹: 백그라운드 작업완료여부를 계속확인하며 호출한 함수가 바로 return되지 않고 백그라운드 작업이 끝나야 return 된다
//비동기 -논 블로킹: 호출한 함수가 바로 return되어 다음 작업으로 넘어가며, 백그라운다 작업완료 여부는 신경쓰지 않고 나중에 백그라운드가 알림을 줄 때 비로소 처리한다.
