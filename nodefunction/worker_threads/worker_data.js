const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const { worker } = require("cluster");

if (isMainThread) {
  //부모스레드인 경우
  const threads = new Set();
  threads.add(
    //new Worker 호출 시 두번째 인수의 workerData속성으로 원하는 데이터를 보낼 수 있다.
    new Worker(__filename, {
      workerData: { start: 1 },
    })
  );
  threads.add(
    new Worker(__filename, {
      workerData: { start: 2 },
    })
  );
  for (let worker of threads) {
    worker.on("message", (message) =>
      console.log("message from worker", message)
    );
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log("job done!");
      }
    });
  }
} else {
  //워커일 때
  const data = workerData;
  //메인스레드(부모스레드)로 보내는 메시지
  parentPort.postMessage(data.start + 100);
}
