const fs = require("fs");

const readStream = fs.createReadStream("./readme4.txt", { highWaterMark: 16 });
const writeStream = fs.createWriteStream("./writeme.txt");

//미리 읽기스트림과 쓰기 스트림을 만들어놓고 pipe메서드로 연결하면 저절로 데이터가 writeStream으로 넘어간다.
readStream.pipe(writeStream);
