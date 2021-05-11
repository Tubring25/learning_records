const serverModule = require('../model').Server;
const { Op } = require('sequelize');
const { createToken, verifyToken } = require('../utils/index')

class userCto {
  constructor() {
    this.instance = serverModule
  }
  async register(body) {
    let { Server_Name, Server_Code, Server_Phone, Server_Area, Server_Avatar  } = body
    try {
      let hasOne = await this.instance.findAll({
        where: {
          [Op.or]: [{Server_Name: Server_Name}, {Server_Phone: Server_Phone}]
        }
      })
      if(hasOne.length>0) {
        return {code: 0, msg: '手机号或用户名已存在'}
      }
      this.instance.create({Server_Name: Server_Name,  Server_Code: Server_Code,
        Server_Phone:Server_Phone, Server_Area: Server_Area, Server_Avatar: Server_Avatar
      })
      return {code:1, data: '创建成功'}
    }
    catch (err) {
      console.log('err',err);
      return {code: 0, msg: JSON.stringify(err)}
    }
  }
}

module.exports = new userCto()