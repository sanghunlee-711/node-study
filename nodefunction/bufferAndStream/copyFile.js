const fs = require("fs").promises;

//createStream과 createWriteStream을 만들어 pipe하지 않아도 파일을 복사할 수 있게 해주는 메서드이다.
//첫번째 인수로 복사할 파일, 두번째로는 복사될 경로, 세번째로는 복사후 실행될 콜백함수를 넣는다.
fs.copyFile("readme4.txt", "writeme4.txt")
  .then(() => {
    console.log("복사완료");
  })
  .catch((error) => {
    console.error(error);
  });
