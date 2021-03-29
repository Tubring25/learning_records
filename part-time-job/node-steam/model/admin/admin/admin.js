module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Admin', {
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
		permission: DataTypes.INTEGER,
		create_time: DataTypes.DATE,
		avatar: DataTypes.STRING
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'st_admin',
		comment: '管理员信息',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
