const fs = require("fs");

//파일 폴더의 변경사항을 감시할 수 있는 메서드이다.
//내용물 수정 및 저장시 change이벤트가 발생하는데 두번씩 발생할 수도 있어서 실무에서 사용시 유의가 필요하다

fs.watch("./target.txt", (eventType, filename) => {
  console.log(eventType, filename);
});
