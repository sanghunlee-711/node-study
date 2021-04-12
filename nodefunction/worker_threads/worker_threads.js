//노드에서 멀티 스레드 방식으로 작업하는 방법

const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  //isMainThread를 통해 현재 코드가 메인스레드에서 실행되는지 아니면 우리가 생성한 워커스레드에서 실행되는지 구분된다.
  console.log(isMainThread);
  //Main Thread에서는 new Workder를 통해 현재 파일(__filename)을 워커 스레드에서 실행시키고 있다.
  const worker = new Worker(__filename);
  //부모는 worker.on("message")를 통해서 메시지를 받는다
  worker.on("message", (message) => console.log("from Worker", message));
  worker.on("exit", () => console.log("worker exit"));
  worker.postMessage("ping");
} else {
  //워커스레드는 parentPort.on("message")이벤트리스너로 부모로부터 메시지를 받음
  parentPort.on("message", (value) => {
    console.log("from parent", value);
    //부모 스레드에(메인스레드) pong 메시지를 보냄
    parentPort.postMessage("pong");
    parentPort.close();
  });
}
