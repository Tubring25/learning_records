module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Recommend', {
		id: {
			type: DataTypes.INTEGER(50),
			primaryKey: true,
			autoIncrement: true
		},
		game_id: DataTypes.INTEGER,
    game_img_list: DataTypes.TEXT,
    game_price: DataTypes.DECIMAL(10,2)
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'st_recommend',
		comment: '推荐商品',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
