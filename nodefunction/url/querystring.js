const url = require("url");
const querystring = require("querystring");

const parsedUrl = url.parse(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);
const query = querystring.parse(parsedUrl.query);
//url의 query부분을 자바스크립트 객체로 분해한다
console.log("querystring.parse():", query);
//분해된 query객체를 문자열로 다시 조립한다.
console.log("querystring.stringify():", querystring.stringify(query));
