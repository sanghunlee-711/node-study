const dep2 = require("./dep2");
console.log("require dep2", dep2);
module.exports = () => {
  console.log("dep2", dep2);
};

//dep1 과 2가 서로를 부르는 상황이 발생되고 console을 찍어보면 dep1이 빈객체로 나타나게 되는데 이러한 현상을 순환참조(circular dependency)라고 한다
// 순환참조가 있을 경우 순환참조되는 대상을 빈 객체로 만들기 때문에 에러가 발생하지 않고 조용히 빈객체로 변경되므로 구조를 잘잡아야하는 것을 알 수 있다.
