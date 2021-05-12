module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Server', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    Server_Name: { type: DataTypes.STRING },
    Server_Code: { type: DataTypes.STRING },
    Server_Phone: { type: DataTypes.STRING },
    Server_Avatar: { type: DataTypes.TEXT},
    Area: { type: DataTypes.STRING },
    Level: { type: DataTypes.STRING },
		roles: {
			type: DataTypes.STRING,
			defaultValue: 'server'
		}
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'server',
		comment: '代取人信息',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
