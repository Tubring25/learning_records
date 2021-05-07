var Sequelize = require('sequelize');

exports.sequelize = function () {
	return new Sequelize('delivery_schema', 'root', '123456', {host: 'localhost', dialect: 'mysql', port:3306, logging:console.log});
}
