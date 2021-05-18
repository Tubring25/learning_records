module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Customer', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    Customer_Name: { type: DataTypes.STRING },
    Customer_RealName: { type: DataTypes.STRING },
    Customer_Code: { type: DataTypes.STRING },
    Customer_Phone: { type: DataTypes.STRING },
    Customer_District: { type: DataTypes.STRING },
    Customer_Gender: { type: DataTypes.STRING },
    Customer_Avatar: { type: DataTypes.TEXT},
		roles: {
			type: DataTypes.STRING,
			defaultValue: 'customer'
		}
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'customer',
		comment: '顾客信息',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
