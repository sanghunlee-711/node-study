const string = "abc";
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: "value",
    },
  },
};
console.time("전체시간");
console.log("평범한 로그로 쉼표로 구분해 여러값 찍기 가능");
console.log(string, number, boolean);
console.error("에러메시지는 console.error로");
//table은 배열요소로 객체 리터럴을 넣으면 , 객체의 속성들이 테이블 형식으로 표현된다
console.table([
  { name: "제로", birth: "1994" },
  { name: "Hero", birth: "1988" },
]);
//console.dir(객체, 옵션)
//표시할 객체를 넣고 옵션을 넣는데 colors를 true로 하면 콘솔에 색이추가되어 한결 보기 편함 depth는 객체를 몇단계 까지 보여줄지 정한다
console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

//timeEnd와 대응 되어 같은 레이블을 가진 time과 timeEnd사이의 시간을 측정한다
console.time("시간측정");
for (let i = 0; i < 100000; i++) {}
console.timeEnd("시간측정");

function b() {
  //에러 발생시 에러위치를 알려주므로 자주 사용하지는 않으나 위치가 나오지 않는다면 사용할만함
  console.trace("에러 위치 추적");
}

function a() {
  b();
}

a();

console.timeEnd("전체시간");
