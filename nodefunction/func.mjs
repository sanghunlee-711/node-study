//var.js를 참조하는 파일
//새로운 문법인(from es2015) import from 이나 export default를 사용하고 싶은 경우
// 노드 9 부터는 mjs확장자 또는 package.json파일에서 type:module로의 설정이 필요하다.
import { odd, even } from "./var/var";

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  }
  return even;
}

export default checkOddOrEven;
