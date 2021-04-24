module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Comment', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    buy_from: DataTypes.STRING,
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'st_comments',
		comment: '评价',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
