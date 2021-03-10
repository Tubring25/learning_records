var Sequelize = require('sequelize');
const config = {
	database: 'steam_schema',
	user: 'root',
	password: '123456'
};
const sequelize = new Sequelize(config['database'], config['user'], config['password'], {
	dialect: 'mysql',
	// pool: {
	// 	max: 5,
	// 	min: 0,
	// 	idea: 10000
	// }
});
sequelize
	.authenticate()
	.then(() => {
		console.log('已成功连接数据库');
	})
	.catch(() => {
		console.error('连接数据库失败');
	});
module.exports = sequelize;
