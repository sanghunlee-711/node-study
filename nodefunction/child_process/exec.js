//child_process는 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈이다.
// 다른 언어의 코드를 실행하고 결과값을 받을 수 있고
// 이름에서 볼 수 있듯이 현재노드 프로세스 외에 새로운 프로세스를 띄워서 명령을 수행하고 노드프로세스에 알려준다.

const exec = require("child_process").exec;

//윈도우라면 exec("dir")
let process = exec("ls");

process.stdout.on("data", function (data) {
  console.log(data.toString());
});

process.stderr.on("data", function (data) {
  console.error(data.toString());
});

//결과는 표준출력(stdout)과 표준에러(stderr)에 붙여둔 data이벤트 리스너에 버퍼형태로 전달된다
//
