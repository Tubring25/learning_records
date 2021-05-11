module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Manager', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    Manager_Name: { type: DataTypes.STRING },
    Manager_Code: { type: DataTypes.STRING },
    Manager_Avatar: { type: DataTypes.TEXT},
		roles: {
			type: DataTypes.STRING,
			defaultValue: 'admin'
		}
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'manager',
		comment: '管理员信息',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
