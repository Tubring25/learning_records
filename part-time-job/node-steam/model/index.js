'use strict';

var sequelize=require('../config/db').sequelize();
var User = sequelize.import('./user/user.js');
var Admin = sequelize.import('./admin/admin/admin.js');
var GameType = sequelize.import('./admin/goodsType/gameType.js');
var Game = sequelize.import('./admin/game/game.js');
var SystemRequirement = sequelize.import('./admin/systemRequirement/systemRequirement.js')
var GameImg = sequelize.import('./admin/game/imgList.js')

// 建立模型之间的关系
Game.hasMany(SystemRequirement)
SystemRequirement.belongsTo(Game)
Game.hasMany(GameImg)
GameImg.belongsTo(Game)

// 同步模型到数据库中
sequelize.sync();

exports.User = User;
exports.Admin = Admin;
exports.GameType = GameType;
exports.Game = Game;
exports.SystemRequirement = SystemRequirement;
exports.GameImg = GameImg
