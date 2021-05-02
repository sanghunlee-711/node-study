//For user information model

const Sequelize = require("sequelize");

module.exports = class User extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          //local: 로컬로그인, kakao: 카카오 로그인
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    //User모델과 Post 모델은 1대다 관계 이고 Post가 User모델에 속하게 되는 개념
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      //follower와 following은 같은 모델들끼리 가지는 N:M관계를 나타내줌
      //사용자 한명이 팔로워를 여러명가질 수 있고, 한사람이 여러명을 팔로잉 할수도 있게된다.
      //이는 User모델과 User모델이 N:M관계가 있는것을 나타내준다.
      foreignKey: "followingId",
      //as를 통해 같은 User모델을 참조하더라도 followingId를 가진 as는 Following을 ,
      // followerId를 가진 as는 Follower를 가리키게 되므로 as는 foreignkey와 반대되는 모델을 가리키는 것을 볼 수 있다.
      as: "Followers",
      //through옵션을 통해서 모델이름과 컬럼이름을 다시 지정해주었다.
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
    db.User.hasMany(db.Domain);
  }
};
