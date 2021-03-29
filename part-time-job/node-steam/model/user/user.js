module.exports = function (sequelize, DataTypes) {
	return sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER(50),
			primaryKey: true,
			autoIncrement: true
		},
		username: DataTypes.STRING(20),
		password: {
			type: DataTypes.STRING,
			max: 20,
			min: 6
		},
		phone: DataTypes.STRING(20),
		email: DataTypes.STRING(30),
		description: DataTypes.STRING(100),
		create_time: DataTypes.DATE,
		avatar: DataTypes.STRING
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'st_user',
		comment: '用户登录信息',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
