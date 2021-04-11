const A = require("./globalA");

global.message = "안녕하세요";
//globalA모듈에 있는 메시지를 호출했으나 globalB에서 적용한 message가 console에 나타남
//이 처럼 전역객체는 남용하면 유지보수 어려움이 생기므로 필요하다면 다른 모듈파일로 관리하여 사용필요
console.log(A());
