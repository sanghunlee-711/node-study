//양방향 암호화를 위해서는 암호화된 문자열을 복호화 할 수 있는데 암호화할때 사용한 키와 같은 키를 사용해야한다.
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = "abcdefghijklmnopqrstuvwxyz123456";
const iv = "1234567890123456";
//암호화할 알고리즘, 키 , iv를 넣게 된다
//aes-256-cbc알고리즘의 경우 키는 32바이트여야하고 , iv는 16바이트여야한다
//iv는 암호화시 사용하는 초기화 벡터를 의미하며 자세히 공부하고싶은 경우 AES암호화에 대해 따로 공부하는 것이 좋다
//crypto.getCiphers()를 호출하면 사용가능한 알고리즘 목록을 볼 수 있다.
const cipher = crypto.createCipheriv(algorithm, key, iv);
//암호화할 대상과 대상의 인코딩, 출력결과물의 인코딩을 넣는다
//보통 문자열은 utf8인코딩을 암호화는 base64를 많이 사용한다
let result = cipher.update("암호화할 문장", "utf8", "base64");
//출력결과물의 인코딩을 넣으면 암호화가 완료된다
result += cipher.final("base64");
console.log("암호화", result);

//복호화할때 사용한다. 암호화 할때 사용했던 알고리즘과 키,iv를 그대로 넣어야한다
const decipher = crypto.createDecipheriv(algorithm, key, iv);
// 암호화된 문장 그문장의 이노딩 복호화할 인코딩을 넣는다
//result 변수와 비교
let result2 = decipher.update(result, "base64", "utf8");
//복호화 결과물의 인코딩을 넣는다
result2 += decipher.final("utf8");
console.log("복호화", result2);
