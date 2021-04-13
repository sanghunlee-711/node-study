//Thread란 process내에서 작업을 수행하는 주체이다.

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const min = 2;
let primes = [];

function findPrimes(start, range) {
  let isPrime = true;
  let end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}
//run

if (isMainThread) {
  console.log("if");

  const max = 10000000;
  //스레드가 일을 나눠 처리하게 하기 위해 선언한 변수
  const threadCount = 8;
  //Set자료 구조형을 통해 중복된 것을 추가하지 않게 해줌
  const threads = new Set();
  const range = Math.ceil((max - min) / threadCount);
  let start = min;

  console.time("prime");
  //8개의 스레드가 일을 나눠서 처리하게함
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = start;
    threads.add(
      //자식쓰레드에게 workerData를 전송
      new Worker(__filename, { workerData: { start: wStart, range } })
    );
  }
  threads.add(
    new Worker(__filename, {
      start,
      range: range + ((max - min + 1) % threadCount),
    })
  );
  for (let worker of threads) {
    worker.on("error", (error) => {
      throw error;
    });
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd("prime");
        console.log(primes.length);
      }
    });
    worker.on("message", (msg) => {
      primes = primes.concat(msg);
    });
  }
} else {
  console.log("else");
  //처음 시작과 동시에는 mainThread에서 작동하고 그 후에 workerThread(자식스레드)에서 작동하게 됨
  console.log(isMainThread);
  let start = workerData && workerData.start;
  let range = workerData && workerData.range;
  findPrimes(start, range);
  parentPort.postMessage(primes);
}
