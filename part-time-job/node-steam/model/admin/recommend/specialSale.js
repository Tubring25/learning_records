module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Recommend', {
		id: {
			type: DataTypes.INTEGER(50),
			primaryKey: true,
			autoIncrement: true
		},
		game_id: DataTypes.INTEGER,
    game_img: DataTypes.TEXT,
		game_name: DataTypes.STRING,
    game_price: DataTypes.DECIMAL(10,2),
    game_sale_price: DataTypes.DECIMAL(10,2)
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'st_spec_sale',
		comment: '特别优惠商品',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
