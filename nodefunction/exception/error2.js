//노드 자체에서 잡아주는 에러를 보자

const fs = require("fs");

setInterval(() => {
  fs.unlink("./abcdefg.js", (err) => {
    if (err) {
      console.error(err);
    }
  });
}, 1000);
