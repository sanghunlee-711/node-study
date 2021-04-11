const { URL } = require("url");

const myURL = new URL(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);
console.log("searchParams:", myURL.searchParams);
//키에 해당하는 모든 값들을 가져옴
console.log("searchParams.getAll():", myURL.searchParams.getAll("category"));
//키에 해당하는 첫번째 값만 가져온다
console.log("searchParams.get():", myURL.searchParams.get("limit"));
//해당 키가 있는지 검사한다
console.log("searchParams.has():", myURL.searchParams.has("page"));

//searchParams의 모든키를 iterator 객체로 가져온다
console.log("searchParams.keys():", myURL.searchParams.keys());
//searchParams의 모든 값을 iterator 객체로 가져온다
console.log("searchParams.values():", myURL.searchParams.values());

//해당 키와 값을 추가한다. 같은키의 값이 있따면 유지하고 하나 더 추가한다.
myURL.searchParams.append("filter", "es3");
myURL.searchParams.append("filter", "es5");
console.log(myURL.searchParams.getAll("filter"));

//append와 유사하나 같은키의 값들을 모두 지우고 새로 추가한다.
myURL.searchParams.set("filter", "es6");
console.log(myURL.searchParams);
console.log(myURL.searchParams.getAll("filter"));

//해당 키를 제거
myURL.searchParams.delete("filter");
console.log(myURL.searchParams.getAll("filter"));

//searchParams객체를 다시 문자열로 바꾼다
console.log("searchParams.toString():", myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
