const request = require("supertest");
const { sequelize } = require("../models");
const app = require("../app");

//beforeAll은 테스트를 실행하기전에 수행되는 코드이다.
beforeAll(async () => {
  //sequelize.sync()메서드를 통해 데이터베이스에 테이블을 생성하고 있다.
  //비슷한 메서드로는 afterAll(모든 테스트 끝난 뒤),
  //afterEach(각 테스트 수행 후), beforeEach(각 테스트 수행 전)이 존재한다.
  await sequelize.sync();
});

//회원가입 테스트를 진행
describe("POST/join", () => {
  test("로그인 안했으면 가입하자", (done) => {
    //불러온 request함수에 app객체를 넣어
    //post, put,get등의 메서드를 원하는 라우터에 요청을 보낼 수 있다.
    request(app)
      .post("/auth/join")
      .send({
        email: "zerocho@gmail.com",
        nick: "zerozero",
        password: "1234",
      })
      .expect("Location", "/")
      .expect(302, done);
  });
});

//로그인한 상태에서 회원가입 시도 -> 코드 순서 매우 중요
//로그인 요청과 회원가입 요청이 순서대로 이루어져야 테스트가 정상진행됨
describe("POST/join", () => {
  const agent = request.agent(app);
  //회원가입 테스트를 위해 아까 생성한 agent객체로 로그인을 먼저 수행한다.
  beforeEach((done) => {
    agent
      .post("/auth/login")
      .send({
        email: "zerocho@gmail.com",
        password: "1234",
      })
      .end(done); //end(done)을 통해 테스트 마무리를 알린다.
  });

  //로그인 된 agent로 회원가입 테스트를 진행한다. 로그인한 상태이므로 에러메시지를 날리자.
  test("이미 로그인 했으면 redirect /", (done) => {
    const message = encodeURIComponent("로그인한 상태입니다!");
    agent
      .post("/auth/join")
      .send({
        email: "zerocho@gmail.com",
        nick: "zerozero",
        password: "1234",
      })
      .expect("Location", `/?error=${message}`)
      .expect(302, done);
  });
});

describe("POST/login", () => {
  test("가입되지 않은 회원", async (done) => {
    const message = encodeURIComponent("가입되지 않은 회원입니다..");
    request(app)
      .post("/auth/login")
      .send({
        email: "cloudlee@gmail.com",
        password: "1234",
      })
      .expect("Location", `/?loginError=${message}`)
      .expect(302, done);
  });

  test("로그인 수행", async (done) => {
    request(app)
      .post("/auth/login")
      .send({
        email: "zerocho@gmail.com",
        password: "1234",
      })
      .expect("Location", "/")
      .expect(302, done);
  });

  test("비밀번호 틀림", async (done) => {
    const message = encodeURIComponent("비밀번호가 일치하지 않습니다..");
    request(app)
      .post("/auth/login")
      .send({
        email: "zerocho@gmail.com",
        password: "움하하하",
      })
      .expect("Location", `/?loginError=${message}`)
      .expect(302, done);
  });
});

describe("GET/logout", () => {
  test("로그인되어 있지 않다면 403", async (done) => {
    request(app).get("/auth/logout").expect(403, done);
  });

  const agent = request.agent(app);

  beforeEach((done) => {
    agent
      .post("/auth/login")
      .send({
        email: "zerocho@gmail.com",
        password: "1234",
      })
      .end(done);
  });

  test("로그아웃 수행", async (done) => {
    agent.get("/auth/logout").expect("Location", "/").expect(302, done);
  });
});

//db 강제로 정리시키기 ㅇㅅㅇ sync({force:true})
afterAll(async () => {
  await sequelize.sync({ force: true });
});
