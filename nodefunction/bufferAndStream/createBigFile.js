//1GB 용량의 텍스트파일을 만드는 코드

const fs = require("fs");
const file = fs.createWriteStream("./big.txt");

for (let i = 0; i <= 10000000; i++) {
  file.write("안녕 엄청나게 큰파일 만들것이야 각오혀라!! \n");
}

file.end();
