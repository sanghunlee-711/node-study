const spawn = require("child_process").spawn;

//폴더 내에 test.py를 실행한 결과값을 proccess 변수에 전달
//spawn은 첫번째 인수로 명령어, 두번째 인수로 옵션배열을 넣으면 된다
let process = spawn("python", ["test.py"]);

//실행결과
process.stdout.on("data", function (data) {
  console.log(data.toString());
});

//실행 에러
process.stderr.on("data", function (data) {
  console.error(data.toString());
});

//exec은 shell을 실행하고 spawn은 새로운 프로세스를 띄우면서 명령어를 실행한다
//spawn에서도 세번째 인수로 {shell: true}를 넣어주면 exec처럼 shell을 이용하여 명령을 수행한다.

//shell을 실행하는지 마는지에 따라 수행할 수 있는 명령어에 차이가 있다.
