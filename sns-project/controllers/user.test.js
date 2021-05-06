//addFollowing메서드는 실제 DB와 연결되어있는 User모델이 들어있기 때문에
//해당 모델을 모킹해야한다. jest.mock을 통해서 모델을 모킹할 수 있다.
jest.mock("../models/user.js");
const User = require("../models/user.js");
const { addFollowing } = require("./user");

describe("addFollowing", () => {
  const req = {
    user: { id: 1 },
    params: { id: 1 },
  };
  const res = {
    send: jest.fn(),
    status: jest.fn(() => res),
  };
  const next = jest.fn();

  test("사용자를 찾아서 팔로잉을 추가하고 successs를 반환해야한다.", async () => {
    //mockReturnValue로 모킹한 모델의 가짜반환값을 저장할 수 있다.
    //사용자를 찾아서 팔로잉을 추가하는 상황을 테스트하기 위해
    // findOne이 addFollwing객체를 리턴하도록 설정했다.
    User.findOne.mockReturnValue(
      Promise.resolve({
        addFollowing(id) {
          return Promise.resolve(true);
        },
      })
    );

    await addFollowing(req, res, next);
    expect(res.send).toBeCalledWith("successs");
  });

  test("사용자를 찾지 못하면 res.status(404).send(No USER)를 호출한다 .", async () => {
    User.findOne.mockReturnValue(null);
    await addFollowing(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith("No USER");
  });

  test("DB 에러 발생시 next(error)호출", async () => {
    const error = "테스트용 에러";
    User.findOne.mockReturnValue(Promise.reject(error));
    await addFollowing(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});
