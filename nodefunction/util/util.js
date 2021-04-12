const util = require("util");
const crypto = require("crypto");

//util.deprecate는 함수가 deprecate가 되었음을 알려주고 첫번째 인자로 넣은 함수가 실행될 경우 두번째인자의 메시지가 실행됨
const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, "dontUseMe 함수는 deprecated");
dontUseMe(1, 2);

//콜백패턴을 프로미스패턴으로 변경해준다.
//바꿀함수를 인수로 제공하면 되며 async/await패턴까지 사용할 수 있어 좋다.
//crypto/pbkdf2.js와 비교해보자
const randomBytesPromise = util.promisify(crypto.randomBytes);

randomBytesPromise(64)
  .then((buf) => {
    console.log(buf.toString("base64"));
  })
  .catch((err) => console.error(err));
