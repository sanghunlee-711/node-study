//스트림을 공부할 때 on("data",콜백) , on("end",콜백)을 사용했는데 바로 data라는 이벤트와 End라는 이벤트가 발생할 때 콜백함수를 호출하도록
// 이벤트를 등록한 것이다.

//createReadStream같은 경우는 내부적으로 알아서 data와 end이벤트를 호출하지만, 우리가 직접 이벤트를 만들 수 도 있다.

//event모듈 활용
const EventEmitter = require("events");

//myEvent라는 객체를 생성-> 객체는 이벤트 관리를 위한 메서드들을 가지고 있다.
const myEvent = new EventEmitter();

//on과 같은기능을하는 addListener
myEvent.addListener("event1", () => {
  console.log("이벤트1");
});

//on(이벤트명, 콜백) => 이벤트 이름과 이벤트 발생시의 콜백을 연결한다.
//이렇게 연결하는 것을 이벤트 리스닝이라고 부른다.
//하나의 이벤트에 여러개를 달아줄 수도 있다.
myEvent.on("event2", () => {
  console.log("이벤트2");
});

myEvent.on("event2", () => {
  console.log("이벤트2 추가");
});

//한번만 실행되는 이벤트이다.
myEvent.once("event3", () => {
  console.log("이벤트 3");
}); //한번만 실행된다.

//emit은 이벤트를 호출하는 메서드이다.
myEvent.emit("event1"); //이벤트 호출
myEvent.emit("event2"); //이벤트 호출

myEvent.emit("event3"); //이벤트 호출
//once라 한번만 실행
myEvent.emit("event3"); //실행안됨

myEvent.on("event4", () => {
  console.log("이벤트 4");
});

//해당 이벤트에 연결된 모든 이벤트리스너를 제거하는 메서드이다.
myEvent.removeAllListeners("event4");
myEvent.emit("event4");

const listener = () => {
  console.log("이벤트5");
};

myEvent.on("event5", listener);
//노드 10버전에는 removeListener와 같은 기능으로 off가 추가되엇다.
myEvent.removeListener("event5", listener);
myEvent.emit("event5"); //실행안됨

//이벤트에 연결된 리스너가 몇개인지 확인하는 메서드
console.log(myEvent.listenerCount("event2"));
