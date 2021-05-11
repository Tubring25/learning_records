module.exports = function (sequelize, DataTypes) {
	return sequelize.define('EpxressOrder', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    Order_Finished_Time: { type: DataTypes.DATE },
    Customer_Phone: { type: DataTypes.INTEGER },
    Expressage_Location: { type: DataTypes.STRING},
    Customer_District: { type: DataTypes.STRING},
    Quantity: { type: DataTypes.INTEGER },
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'epxress_order',
		comment: '管理员信息',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
