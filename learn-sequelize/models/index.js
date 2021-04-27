const Sequelize = require("sequelize");
const User = require("./user");
const Comment = require("./comment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

//Sequelize는 시퀄라이즈 패키지이자 생성자
//config/config.json에서 데이터베이스 설정을 불러온 후 new sequelize를 통해 MYSQL 연결 객체를 생성한다.
//sequelize는 모델과 MySQL의 테이블을 연결해주는 역할을 한다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//연결객체를 나중에 재사용하기 위해 db.sequelize를 넣어두었다.
db.sequelize = sequelize;
//db 객체에 User, Comment모델을 담아 두었다.
//앞으로 db객체를 require시켜 User와 Comment의 모델에 접근할 수 있게 된다.
db.User = User;
db.Comment = Comment;

//테이블이 모델로 연결되게 하는 init메서드 호출
User.init(sequelize);
Comment.init(sequelize);

//다른테이블과의 관계를 연결하는 associate 메서드 호출
User.associate(db);
Comment.associate(db);

module.exports = db;
