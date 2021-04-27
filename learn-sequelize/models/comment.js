const Sequelize = require("sequelize");

module.exports = class Comment extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    //다른모델들의 정보가 들어가는 테이블에 belongTo를 사용하면 된다.
    //Commenter 모델의 외래키 컬럼은 commenter이고 User 모델의 id컬럼을 가리키고 있다.
    db.Comment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
  }
};
