const Sequelize = require("sequelize");
const baseModel = require("./baseModel");

class userModel extends baseModel {
  constructor() {
    super(
      "op_users",
      {
        id: {
          type: Sequelize.INTEGER(50),
          primaryKey: true,
          autoIncrement: true,
        },
        username: Sequelize.STRING(20),
        passwd: {
          type: Sequelize.STRING,
          max: 20,
          min: 6,
        },
        phone: Sequelize.STRING(20),
        email: Sequelize.STRING(30),
        authority: Sequelize.INTEGER, // 0. 超级管理严 1.普通管理员
        avatar: Sequelize.STRING,
      },
      {
        timestamps: false, // 禁止默认添加时间戳
        freezeTableName: true, // 禁止修改表名
      }
    );
    this.model = super.getModel();
    this.model.sync();
  }
}

module.exports = new userModel();
