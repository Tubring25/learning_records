const userModel = require('../model/user/user');
const Sequelize = require('sequelize')
const { Op } = require('sequelize');

class userCto {
  constructor() {
    this.instance = userModel
  }
  async register(body) {
    let { email, password, username } = body
    if(!email || !password || !username) {
      return {code: 0, msg: '缺少信息'}
    }
    try {
      let hasOne = await this.instance.findAll({
        where: {
          [Op.or]: [{email: email}, {username: username}]
        }
      })
      if(hasOne.length>0) {
        return {code: 0, msg: '邮箱或用户名已存在'}
      }
      this.instance.create({email: email, password: password, username: username})
      return {code:1, data: '创建成功'}
    }
    catch (err) {
      console.log('err',err);
      return {code: 0, msg: JSON.stringify(err)}
    }
  }
}

module.exports = new userCto()