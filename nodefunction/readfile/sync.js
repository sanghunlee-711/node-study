const fs = require("fs");

console.log("시작");
let data = fs.readFileSync("./readme2.txt");
console.log("1번", data.toString());
data = fs.readFileSync("./readme2.txt");
console.log("2번", data.toString());
data = fs.readFileSync("./readme2.txt");
console.log("3번", data.toString());
console.log("끝");

//코드는 이해하기 쉬우나 이렇게 하면 요청이 수백개 이상 들어올 때
//백그라운드가 처리하는 동안 메인스레드가 놀고 있는 시간이 생기므로 비효율 적이다.
//프로그램을 처음 실행할 때 초기화 용도로만 사용하는 것을 권장한다고 한다.
