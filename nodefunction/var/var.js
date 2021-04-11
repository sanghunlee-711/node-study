const odd = "홀수 입니다";
const even = "짝수 입니다";

//module.exports에 변수들을 담은 객체를 대입했다.
//이제 이 파일은 모듈로서 기능을 하게 됨
// 변수들을 모아놓은 모듈이 되는 것
//다른 파일에서 이 파일을 불러오면 module.exports에 대입된 값을 사용할 수 있다.
module.exports = {
  odd,
  even,
};
