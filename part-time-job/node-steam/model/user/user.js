const Sequelize = require('sequelize');
const baseModel = require('../baseModel');

class userModel extends baseModel {
	constructor() {
		super('st_user', {
			id: {
				type: Sequelize.INTEGER(50),
				primaryKey: true,
				autoIncrement: true
			},
			username: Sequelize.STRING(20),
			password: {
				type: Sequelize.STRING,
				max: 20,
				min: 6
			},
			phone: Sequelize.STRING(20),
			email: Sequelize.STRING(30),
      description: Sequelize.STRING(100),
			create_time: Sequelize.DATE,
			avatar: Sequelize.STRING
		},
		{
			timestamps: false, // 禁止默认添加时间戳
			freezeTableName: true, // 禁止修改表名
		})

		this.model = super.getModel()
		this.model.sync()
	}
}

module.exports = new userModel()