module.exports = function (sequelize, DataTypes) {
	return sequelize.define('take-out_order', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    Order_ID: {type: DataTypes.STRING},
    Order_No: {type: DataTypes.STRING},
    Customer_Phone: {type: DataTypes.STRING},
    Customer_ID: {type: DataTypes.INTEGER},
    Server_ID: {type: DataTypes.INTEGER},
    Order_Money: { type: DataTypes.DECIMAL(2) },
    Customer_District: { type: DataTypes.STRING },
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'take-out',
		comment: '代取外卖表',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
