module.exports = function (sequelize, DataTypes) {
	return sequelize.define('SystemRequirement', {
		id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      autoIncrement: true
    },
    req_type: DataTypes.INTEGER,
    handle_system: {type: DataTypes.STRING, defaultValue: 'Windows 10'},
    cpu: {type: DataTypes.STRING, defaultValue: 'Intel i5-4590'},
    ram: {type: DataTypes.INTEGER, defaultValue: 8},
    ram_unit: {type: DataTypes.STRING, defaultValue: 'GB'},
    gpu: {type: DataTypes.STRING, defaultValue: 'NVIDIA GTX 970 / AMD Radeon R9 290'},
    storage_space: {type: DataTypes.INTEGER, defaultValue: 4},
    storage_space_unit: {type: DataTypes.STRING, defaultValue: 'GB'}
	},
	{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
		tableName: 'st_system_requirement',
		comment: '游戏分类信息',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
}