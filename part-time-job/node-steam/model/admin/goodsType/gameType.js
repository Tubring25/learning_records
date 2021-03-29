const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('GameType', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING, // 类型名称
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'st_game_type',
		comment: '游戏分类信息',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}