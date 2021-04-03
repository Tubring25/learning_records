module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Game', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING, // 游戏名称
    desc: DataTypes.STRING, // 描述
    release_date: DataTypes.DATE, // 发行日期
    developer: DataTypes.STRING, // 开发商
    publisher: DataTypes.STRING, // 发行商
    game_type: DataTypes.STRING, // 游戏类型toString
    price: { type: DataTypes.DECIMAL(10,2), defaultValue: '0.00' }, // 发行价格
    is_sale: { type: DataTypes.BOOLEAN, defaultValue: false}, // 是否打折
    sale_price: { type: DataTypes.DECIMAL(10,2), defaultValue: '0.00' }, // 打折价
    is_onshelf: { type: DataTypes.BOOLEAN, defaultValue: false }, // 是否上架
    is_delete: { type: DataTypes.BOOLEAN, defaultValue: false}, // 删除
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'st_game',
		comment: '游戏信息',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
