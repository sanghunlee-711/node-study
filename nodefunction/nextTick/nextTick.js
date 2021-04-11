setImmediate(() => {
  console.log("Immediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

setTimeout(() => {
  console.log("TIMEOUT");
}, 0);

Promise.resolve().then(() =>
  console.log(
    "PROMISE!!                                                                                                                                 "
  )
);

//process.nextTick은 setImmediate나 setTimeout보다 먼저 실행된다

//resolve된 promise도 nextTick처럼 다른 콜백들보다 우선시 되기 때문에 이 둘을 마이크로태스크(microtask)라고 부른다
