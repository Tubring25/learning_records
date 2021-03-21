const Sequelize = require('sequelize');
const baseModule = require('../../baseModel');
const moment = require('moment');

class game extends baseModule {
  constructor() {
    super('st_game', {
      id: {
        type: Sequelize.INTEGER(50),
				primaryKey: true,
				autoIncrement: true
      },
      name: Sequelize.STRING, // 游戏名称
      desc: Sequelize.STRING, // 描述
      img_list: Sequelize.TEXT, // 图片列表
      release_date: Sequelize.DATE, // 发行日期
      developer: Sequelize.STRING, // 开发商
      publisher: Sequelize.STRING, // 发行商
      game_type: Sequelize.STRING, // 游戏类型
      platform: Sequelize.STRING, // 运行平台
      price: Sequelize.DECIMAL(10,2), // 发行价格
      is_sale: { type: Sequelize.BOOLEAN, defaultValue: false}, // 是否打折
      sale_price: Sequelize.DECIMAL(10,2), // 打折价
      is_onshelf: { type: Sequelize.BOOLEAN, defaultValue: false }, // 是否上架
      is_delete: { type: Sequelize.BOOLEAN, defaultValue: false}, // 删除
      createdAt: { // 创建时间
        type: Sequelize.DATE,
        get() {
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
      },
      updatedAt: { // 更新时间
        type: Sequelize.DATE,
        get() {
          return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    },
    {
      freezeTableName: true, // 禁止修改表名
    })
    this.model = super.getModel()
    this.model.sync()
  }
}

module.exports = new game()