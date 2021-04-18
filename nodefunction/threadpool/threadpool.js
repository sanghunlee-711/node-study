//fs 모듈의 비동기 메서드들은 백그라운드에서 실행되고, 실행된 후에는 다시 메인 스레드의 콜백함수나 프로미스의 then부분에서 실행된다.
//이 때 fs 메서드들을 여러번 실행해도 백그라운드에서 동시에 처리되느데, 바로 스레드풀이 있기 때문이다.

//fs 외에도 내부적으로 스레드풀을 사용하는 모듈로는 crypto, zlib, dns.lookup등이 존재한다.
//실행할때 마다 시간과 순서가 달라지는데 , 스레드풀이 작업을 동시에 처리하므로 여덟개의 작업 중 어느것이 먼저 처리될지 모른다.

//하지만 하나의 규칙을발견할 수 있는데, 1~4와 5~8이 그룹으로 묶여져 있고 5~8그룹이 시간이 더 소요된다.
//바로 기본적인 스레드풀의 개수가 4개이기 때문인데 스레드풀이 네개이니 처음 네개의 작업이 동시에 실해되고, 그것들이 종료되면 다음 네개의 작업이 실행된다.
// 컴퓨터의 코어갯수가 4개보다 작다면 다른 결과가 생길수도 있다.

const crypto = require("crypto");
const pass = "pass";
const salt = "salt";
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("1:", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("2:", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("3:", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("4:", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("5:", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("6:", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("7:", Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("8:", Date.now() - start);
});

//내 맥은 쿼드코어라 터미널에 기입 시 UV_THREADPOOL_SIZE = 4 가 최대 효율이다
//해당 명령어는 윈도우와 mac이 다르고 환경변수에 설정되어 있는 값을 바꿔준다.
