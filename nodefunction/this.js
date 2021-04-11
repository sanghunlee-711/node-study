console.log(this);
//최상위에서 사용하는 this는 module.exports를 가리키는 특성이 존재

console.log(this === module.exports);
console.log(this === exports);

function whatIsThis() {
  //함수 선언문 내부의 this는 global객체를 가리킴
  console.log("function", this === exports, this === global);
}

whatIsThis();
