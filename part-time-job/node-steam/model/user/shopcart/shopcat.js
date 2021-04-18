module.exports = function (sequelize, DataTypes) {
	return sequelize.define('ShopCart', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    game_ids: DataTypes.STRING,
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'st_shopcart',
		comment: '购物车',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
