const Sequelize = require("sequelize");

module.exports = class Domain extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        host: {
          type: Sequelize.STRING(80),
          allowNull: false,
        },
        type: {
          //넣을 수 있는 값을 제한하는 데이터 형식이다. 무료나 프리미엄 중하나의 종류만 선택할 수 있게 만들었다.
          type: Sequelize.ENUM("free", "premium"),
          allowNull: false,
        },
        clientSecret: {
          //다른 사용자들이 API를 사용할 때 필요한 비밀 키이다.
          type: Sequelize.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "Domain",
        tableName: "domains",
      }
    );
  }
  static associate(db) {
    db.Domain.belongsTo(db.User);
  }
};
