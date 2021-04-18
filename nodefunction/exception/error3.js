//프로미스의 에러는 catch하지 않아도 알아서 처리된다. 그러나 에러를 알아서 처리하는 동작은 버전에 따라 바뀔 수 있으므로
//catch를 항상 붙여주는 것을 권장한다고 한다.

const fs = require("fs").promises;

setInterval(() => {
  fs.unlink("./abcdefg.js");
});
