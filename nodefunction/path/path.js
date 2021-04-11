const path = require("path");

const string = __filename;
//POSIX는 리눅스 기반 운영체제를 말한다
//경로의 구분자 윈도우는 \ POSIX는 /
console.log("path.sep", path.sep);
//환경변수의 구분자 process.env.PATH를 입력하면 여러개의 경로가 구분되는 것을 보임
// 윈도우는 ; POSIX는 :
console.log("path.delimiter", path.delimiter);
console.log("-----------------------");
//파일이 위치한 폴더 경로를 보여줌 //path.js
console.log("path.dirname()", path.dirname(string));
//파일의 확장자를 보여줌 //.js
console.log("path.extname()", path.extname(string));
//파일의 이름(확장자포함)을 나타냄
console.log("path.basename()", path.basename(string));
//파일의 이름만 표시하고 싶다면 두번째 인자로 path.extname()을 넣어주면 된다
console.log(
  "path.baesname - extname:",
  path.basename(string, path.extname(string))
);
console.log("-----------------------");

//root, dir, base, ext, name으로  분리하여 경로를 보여준다
console.log("path.parse()", path.parse(string));
//path.parse한 객체를 파일 경로로 합친다
console.log(
  "path.format():",
  path.format({ dir: "C:\\users\\hun", name: "path", ext: ".js" })
);
// 실수로 여러번의 구분자를 넣었을 때 정상적인 경로로 변환해준다
console.log("path.normalize():", path.normalize("C://users\\\\hun\\path.js"));
console.log("-----------------------");
//절대경로인지 상대경로인지 확인해준다
console.log("path.isAbsolute(/Users)", path.isAbsolute("/Users"));
console.log("path.isAbsolute(./home):", path.isAbsolute("./home"));
console.log("-----------------------");

//두가지 경로를 넣으면 첫번째 경로에서 두번째 경로로 가는 방법을 알려준다.
console.log(
  "path.relative()",
  path.relative("C:\\users\\hun\\path.js", "C:\\")
);

//여러 인수를 넣으면 하나의 경로로 합친다.
console.log(
  "path.join():",
  path.join(__dirname, "..", "..", "/users", ".", "hun")
);
//
console.log(
  "path.resolve():",
  path.resolve(__dirname, "..", "users", ".", "/hun")
);
