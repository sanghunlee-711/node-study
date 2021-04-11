//웹브라우저에서사용되는 js는 운영체제의 정보를 가져올 수 없으나 노드는 os모듈에 정보가 담겨있어 정보를 가져올 수 있다.

const os = require("os");

console.log("운영체제 정보");
//process.arch 와 동일 // x64, x32 ...
console.log("os.arch():", os.arch());
//process.platform 와 동일 //darwin, window..
console.log("os.platform():", os.platform());
//운영체제의 종류
console.log("os.type():", os.type());
//부팅이후 흐른 시간(초) //process.uptime()은 노드의 실행시간
console.log("os.uptime():", os.uptime());
//컴퓨터의 이름을 보여준다 //MacBook-Pro-1.local
console.log("os.hostname():", os.hostname());
//운영체제의 버전을 보여준다 //12.1.0;
console.log("os.release():", os.release());

console.log("경로 -----");
//홈 디렉토리의 경로를 보여준다 // /Users/ronaldo
console.log("os.homddir()", os.homedir());
//임사파일 저장경로를 보여준다 // /var/folders/xg/...
console.log("os.tmpdir():", os.tmpdir());

console.log("CPU정보 -----");
//컴퓨터의 코어정보를 보여준다
console.log("os.cpus():", os.cpus());
console.table(os.cpus());
console.log("os.cpus().length:", os.cpus().length);

console.log("메모리 정보 -----");
//컴퓨터의 사용가능한 메모리(RAM)를 보여준다
console.log("os.freemem():", os.freemem());
//전체 메모리 용량을 보여준다
console.log("os.totalmem():", os.totalmem());
