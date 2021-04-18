const fs = require("fs").promises;

//폴더안의 내용물을 확인할 수 있다. 배열안에 내부파일과 폴더명이 나온다
fs.readdir("./folder")
  .then((dir) => {
    console.log("폴더 내용 확인", dir);
    //unlink는 파일을 지울 수 있고 파일이 없다면 에러가 발생하므로 먼저 파일이 있는지를 꼭 봐야한다.
    return fs.unlink("./folder/newFile.js");
  })
  .then(() => {
    console.log("파일 삭제 성공");
    //폴더안에 파일들이 있다면 에러가 발생하므로 먼저 내부파일을 '모두 지우고' 호출해야한다.
    return fs.rmdir("./folder");
  })
  .then(() => {
    console.log("폴더 삭제 성공");
  })
  .catch((err) => {
    console.error(err);
  });
