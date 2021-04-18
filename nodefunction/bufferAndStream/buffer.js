const buffer = Buffer.from("저를 버퍼로 바꿔보세요");

//from은 문자열->버퍼로 변경
console.log("from()", buffer);
//버퍼의 크기를 알려준다
console.log("length:", buffer.length);
//버퍼를 다시 문자열로 변경한다 이때 base64, hex를 인수로 넣고 해당 인코딩으로 변환 가능하다.
console.log("toString():", buffer.toString());
console.log("toString('base64'):", buffer.toString("base64"));
console.log("toString('hex'):", buffer.toString("hex"));

const array = [
  Buffer.from("띄엄"),
  Buffer.from("띄어엄"),
  Buffer.from("띄어쓰기"),
];
//배열안의 버퍼를 하나로 합친다.
const buffer2 = Buffer.concat(array);
console.log("concat():", buffer2.toString());

//alloc은 빈 버퍼를 생성한다.
//바이트를 인수로 넣으면 해당 크기의 버퍼가 생성된다.
const buffer3 = Buffer.alloc(5);
console.log("alloc():", buffer3);

//readFile방식의 버퍼가 편리하기는 하지만 문제점이 존재하는데
// 만약 100MB의 용량을 가진 파일이 있으면 읽을 때 메모리에 100MB의 버퍼를 만들어야한다.
//이 작업을 동시에 10개만 해도 1GB에 달하는 메모리가 사용된다.
// 특히 서버처럼 몇명이 이용할 지 모르는 환경에서는 메모리문제가 발생할 수 있다.

//또한, 모든 내용을 버퍼에 다 쓴 후에야 다음 동작으로 넘어 갈 수 있기 때문에
//읽기 ,압축 ,쓰기 등의 조작을 연달아 할 시 매번 전체용량을 버퍼로 처리해야 다음단계로 넘어가게 된다.

//그래서 버퍼의 크기를 작게 만든 후 여러번으로 쪼개서 보내는 방식이 있다.
//버퍼 1MB를 만든 후 100MB파일을 백번에 걸쳐서 나눠 보내는 것이다.
// 이로써 메모리 1MB로 100MB의 파일을 전송할 수 있게 된다.
// 이것을 편리하게 만든것이 스트림이다!
