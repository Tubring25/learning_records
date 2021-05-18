module.exports = function (sequelize, DataTypes) {
	return sequelize.define('expressage_order', {
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
    Expressage_Location: { type: DataTypes.STRING },
    Customer_District: { type: DataTypes.STRING },
    Quantity: { type: DataTypes.STRING },
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'expressage',
		comment: '代取快递表',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
