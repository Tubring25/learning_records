module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Feedback_Sheet', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    Feedback_Content: { type: DataTypes.STRING },
    Order_ID: {type: DataTypes.INTEGER },
    Customer_ID: {type: DataTypes.INTEGER },
    Server_Level: {type: DataTypes.INTEGER },
    status: { type: DataTypes.BOOLEAN, DefaultValue: false},
    Manager_Content: { type: DataTypes.STRING },
  },
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'feedback',
		comment: '反馈表',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}
