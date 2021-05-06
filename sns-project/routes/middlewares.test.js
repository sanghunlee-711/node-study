const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

//describe는 테스트를 그룹화해주는 메서드이다
//첫번째 인수는 그룹에 대한 설명, 두번째 인수인 함수는 그룹에 대한 내용이다.
describe("isLoggedIn", () => {
  //테스트를 위한 가짜객체 생성(mocking)
  const res = {
    //함수를 모킹할 때는 jest.fn 메서드를 사용한다.
    //반환값을 지정해주고 싶을 때는 jest.fn(()=>반환값) 형태로 사용하면 된다.
    //res.status.send("...")와 같이 메서드 체이닝이 되어야하므로 res를 반환
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();

  //test함수의 첫번째 인수는 테스트에 대한설명, 두번째 인수인 함수는 테스트내용을 적으면된다.
  test("로그인이 되어 있으면 isLoggedIn이 next를 호출해야한다.", () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };

    isLoggedIn(req, res, next);
    //toBeCalledTimes는 정확하게 몇번 호출 되었는지를 체크하는 메서드
    expect(next).toBeCalledTimes(1);
  });

  test("로그인이되어 있지 않다면 isLoggedIn이 에러를 응답해야한다.", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };

    isLoggedIn(req, res, next);
    //toBeCalledWith는 특정인수와 함께 호출되었는지를 체크하는 메서드이다.
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledWith("로그인 필요!!");
  });
});

describe("isNotLoggedIn", () => {
  const res = {
    redirect: jest.fn(),
  };

  const next = jest.fn();

  test("로그인이 되어 있으면 isNotLoggedIn이 에러를 응답해야한다.", () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };

    isNotLoggedIn(req, res, next);
    const message = encodeURIComponent("로그인한 상태입니다!");
    expect(res.redirect).toBeCalledWith(`/?error=${message}`);
  });
  test("로그인이 되어 있지 않다면 isNotLoggedIn이 next를 호출해야한다.", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };

    isNotLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  });
});
