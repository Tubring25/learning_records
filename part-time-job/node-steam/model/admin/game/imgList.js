module.exports = function (sequelize, DataTypes) {
	return sequelize.define('GameImg', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    path: DataTypes.TEXT,
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'st_game_img',
		comment: '游戏图片信息',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
