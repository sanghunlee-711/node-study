const { odd, event, even } = require("./var/var");
//func js에서는 checkOddOrEven로 사용되고 있다. 이렇게 변수이름을 변경하여 사용도 가능하다.
const checkNumber = require("./func");

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven("HEllo"));
