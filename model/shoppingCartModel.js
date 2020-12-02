/**
 * shoppingCart
 */
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
        user_id: Sequelize.INTEGER, // 用户id
        opear_id: Sequelize.INTEGER, // 剧的id
        seat_type: Sequelize.INTEGER, // 座位种类
        ticket_num: Sequelize.INTEGER, // 票的数量
        price: Sequelize.DECIMAL, // 单价
        total_price: Sequelize.INTEGER, // 总价
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
