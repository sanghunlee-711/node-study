//쓰기 시작할 거임
const fs = require("fs");

const writeStream = fs.createWriteStream("./writeme2.txt");
writeStream.on("finish", () => {
  console.log("파일쓰기 완료");
});

writeStream.write("이글 쓰자. \n");
writeStream.write("한번 더 쓰자.");
writeStream.end();
