const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

//Sequelize는 시퀄라이즈 패키지이자 생성자
//config/config.json에서 데이터베이스 설정을 불러온 후 new sequelize를 통해 MYSQL 연결 객체를 생성한다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//연결객체를 나중에 재사용하기 위해 db.sequelize를 넣어두었다.
db.sequelize = sequelize;

module.exports = db;
