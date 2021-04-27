const Sequelize = require("sequelize");

//User모델은 Sequelize의 Model클래스를 확장한다.
module.exports = class User extends (
  Sequelize.Model
) {
  //init 메서드에는 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      //첫번째 인자는 테이블컬럼에 대한 설정
      {
        //시퀄라이즈는 알아서 id를 기본키로 연결하므로 id컬럼은 적어 줄 필요가 없다.
        //아래는 나머지 컬럼(name, age 등..)의 스펙을 입력한다. MySQL테이블과 컬럼내용이 일치해야 정확하게 대응된다.

        name: {
          //VARCHAR는 STRING으로 ,INT는 INTEGER로, TINYINT는 불리안으로 등 MySQL의 자료형과 조금 다르다.
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          //INTEGER.UNSIGNED는 UNSIGNED옵션이 적용된 INT이다.
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          //NOT NULL(nullable 설정)
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          //now()와 같음
          defaultValue: Sequelize.NOW,
        },
      },

      //두번째 인자는 테이블 자체에 대한 설정
      {
        //sequelize는 static init메서드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣어야 한다.
        //나중에 model/index.js에서 연결된다.
        sequelize,
        //timestamps true일 경우 시퀄라이즈는 createdAt 과 updatedAt컬럼을 추가한다.(각 각 row가 생성될 때와 수정될때의 시간이 자동으로 입력됨.)
        //예제는 created_at 컬럼을 직접만들었으므로 false로 진행
        timestamps: false,
        //underscored는 컬럼명을 카멜케이스(기본 옵션으로 카멜 케이스 생성)에서 스네이크케이스로 바꿔주는 옵션
        underscored: false,
        //모델 이름을 설정할 수 있다.
        modelName: "User",
        //실제 데이터베이스의 이름이 되는 부분이다 기본적으로 모델이름을 소문자 및 복수형으로 만든다(모델:User, 테이블:users)
        tableName: "users",
        //paranoid는 true일 경우 deletedAt이라는 컬럼이 생성된다. 로우를 삭제할 때 완전히 지워지지 않고 deletedAt에 지운시각이 기록된다.
        //로우 조회 명령 시 deletedAt이 null인 경우 삭제되지 않았다는 것이다. -> 복원을 위한 소프트 딜리트 같은 개념
        paranoid: false,
        //한글 입력을 위한 설정
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  //associate 메서드에는 다른 모델과의 관계를 적는다.
  static associate(db) {
    //hasMany메서드를 통해 1:N 관계를 표현한다.
    //사용자(user는 한명)는 한명이고 comment는 여러개이므로 comment 컬럼이 추가되는 Comment 모델에 belongsTo를 사용하면 된다.
    //Commenter 모델의 외래키 컬럼은 commenter이고 User 모델의 id컬럼을 가리키고 있다.
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }
};
