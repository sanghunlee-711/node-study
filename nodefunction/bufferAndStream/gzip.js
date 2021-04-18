//노드에서는 파일을 압축하는 zlib이라는 모듈을 제공한다.
const zlib = require("zlib");
const fs = require("fs");

const readStream = fs.createReadStream("./readme4.txt");
//createGzip 메서드가 스트림을 지원하므로 파이핑이 가능하다.
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream("./readme4.txt.gz");
readStream.pipe(zlibStream).pipe(writeStream);
