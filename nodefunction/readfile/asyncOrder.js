const fs = require("fs");

console.log("시작");
fs.readFile("./readme2.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("1번", data.toString());
  fs.readFile("./readme2.txt", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("2번", data.toString());
    fs.readFile("./readme2.txt", (err, data) => {
      if (err) {
        throw err;
      }
      console.log("3번", data.toString());
    });
  });
});

//콜백지옥을 통해 순서를 보장할 수 있기는 하다
// 다른 방법으로는 Promise나 ansyc/await를 활용하여 해결할 수 있다.
