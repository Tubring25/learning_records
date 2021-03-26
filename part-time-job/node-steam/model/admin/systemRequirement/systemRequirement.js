const baseModule = require('../../baseModel')
const { DataTypes } = require('sequelize');

class systemRequireModule extends baseModule {
  constructor() {
    super('st_system_requirement', {
      id: {
				type: DataTypes.INTEGER(50),
				primaryKey: true,
				autoIncrement: true
			},
      goods_id: DataTypes.INTEGER,
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
			timestamps: false, // 禁止默认添加时间戳
			freezeTableName: true, // 禁止修改表名
		})

		this.model = super.getModel()
		this.model.sync()
    
  }
}

module.exports = new systemRequireModule()