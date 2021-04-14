module.exports = function (sequelize, DataTypes) {
	return sequelize.define('ShopCart', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    order_no: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    num: DataTypes.INTEGER,
    money: DataTypes.DECIMAL(10,2),
    is_finished: DataTypes.BOOLEAN
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
