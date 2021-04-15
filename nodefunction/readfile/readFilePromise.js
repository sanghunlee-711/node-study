const fs = require("fs").promises;

fs.readFile("./readme.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });

//아래 기존코드와 비교해보자
//콜백형태로 사용치 않고 프로미스로 사용하니 절차가 더 편해지는 느낌쓰
// const fs = require("fs");

// fs.readFile("./readme.txt", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
//   console.log(data.toString());
// });
