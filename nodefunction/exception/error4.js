//uncaughtException이벤트 리스너를 process객체에 달았다.
//처리하지 못한 에러가 발생했을 때, 이벤트리스너가 실행되고 프로세스가 유지된다.
//아래 uncaughtException 부분이 없다면 setTimeout이 실행되지 않고 프로세스가 멈췄을 것이다.
process.on("uncaughtException", (err) => {
  console.error("예기치 못한 에러", err);
});

setInterval(() => {
  throw new Error("서버 고장 가즈아!");
}, 1000);

setTimeout(() => {
  console.log("실행 됩니당");
}, 2000);
