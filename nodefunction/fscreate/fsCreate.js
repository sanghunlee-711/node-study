const fs = require("fs").promises;
const constants = require("fs").constants;

//fs.access("경로", 옵션, 콜백)
//폴더나 파일에 접근할 수 있는지를 체크한다. 두번째 인자로 상수들을 가져오고 F_OK는 파일 존재여부, R_OK는 읽기 권한여부, W_Ok는 쓰기권한 여부를 체크한다.
//파일/폴더나 권한이 없다면 에러가 발생하는데 파일/폴더가 없을 때의 에러코드는 ENOENT이다.
fs.access("./folder", constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => {
    return Promise.reject("이미 폴더 있음");
  })
  .catch((err) => {
    if (err.code === "ENOENT") {
      console.log("폴더 없음");
      //fs.mkdir(경로,콜백)
      //폴더를 만드는 메서드이다, 이미 폴더가 있다면 에러가 발생하므로 먼저 access메서드를 호출해서 확인하는 것이 중요하다.
      return fs.mkdir("./folder");
    }
    return Promise.reject(err);
  })
  .then(() => {
    console.log("폴더 만들기 성공");
    //파일의 아이디(fd변수)를 가져오는 메서드이며 파일이 업사면 파일 생성 뒤, 그 아이디를 가져온다.
    //가져온 아이디(fd)를사용하여 fs.read나 write로 읽거나 쓸 수 있다.
    //두번째 인자로 쓰려면w, 읽으려면 r, 기존파일 추가를 위한다면 a를 넣으면 된다.
    return fs.open("./folder/file.js", "w");
  })
  .then((fd) => {
    console.log("빈 파일 만들기 성공", fd);
    //파일의 이름을 바꾸는 메서드이며 기존파일 위치와 새로운파일의 위치를 적으면 된다
    //꼭 같은 폴더를 지정할 필요는 없으므로 잘라내기 같은 기능으로도사용할 수 있다.
    fs.rename("./folder/file.js", "./folder/newfile.js");
  })
  .then(() => {
    console.log("이름 바꾸기 성공");
  })
  .catch((err) => {
    console.error(err);
  });
