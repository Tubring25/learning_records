'use strict';

var sequelize=require('../config/db').sequelize();
var Admin = sequelize.import('./admin.js');
var Customer = sequelize.import('./customer.js');
var Server = sequelize.import('./server.js');
var Feedback = sequelize.import('./feedback.js')
var expressage = sequelize.import('./expressage.js')
var takeout = sequelize.import('./takeOut.js')

// 同步模型到数据库中
sequelize.sync();

exports.Customer = Customer;
exports.Admin = Admin;
exports.Server = Server;
exports.Feedback = Feedback;
exports.expressage = expressage;
exports.takeout = takeout;
