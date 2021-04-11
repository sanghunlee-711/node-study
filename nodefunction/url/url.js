//url 처리에는 WHATWG 방식과 예전 노드에서 사용한 방식 두가지가 존재

const url = require("url");
//생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리가 된다, url 모듈안에 URL생성자가 존재
const { URL } = url;
const myURL = new URL(
  "http://www.gilbut.co.kr/book/booklist.aspx?sercate1=001001000#"
);

console.log("new URL()", myURL);
console.log("url.format()", url.format(myURL));
console.log("--------------");

//url.parse(주소): 주소를 분해 WHATWG방식과 비교하면 username, password대신 auth속성이 있고 searchParams대신 query가 있다.
const parsedUrl = url.parse(
  "http://www.gilbut.co.kr/book/booklist.aspx?sercate1=001001000#"
);

console.log("url.parse():", parsedUrl);

//WHATWG 방식과 기존 노드방식의 url을 모두 사용할 수 있고 분해 되었던 url객체를 다시 원래 상태로 조립한다.
console.log("url.format():", url.format(parsedUrl));
