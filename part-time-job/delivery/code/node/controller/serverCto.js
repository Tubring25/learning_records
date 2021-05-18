const serverModule = require('../model').Server;
const expressageModule = require('../model').expressage
const takeoutModule = require('../model').takeout
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
  async getUserList(body) {
    try {
      let user
      if(body.id) {
        let {id} = body
        user = await this.instance.findAndCountAll( {where: {id: id}})
      } else {
        user = await this.instance.findAndCountAll()
      }
      return {code: 1, data: user}
    }catch(err) { 
      console.log(err)
      return {code: 0, msg: JSON.stringify(err)} }
  }
  async updateInfo(body) {
    let {id,Server_Name, Server_Code, Server_Phone, Server_Area, Server_Avatar } = body
    try {
      let res = await this.instance.update({Server_Name: Server_Name,  Server_Code: Server_Code,
        Server_Phone:Server_Phone, Server_Area: Server_Area, Server_Avatar: Server_Avatar
      }, {where: {id: id}})
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  // 获取快递订单
  async getExpressList(body) {
    let {Server_ID } = body
    try {
      let res = await expressageModule.findAll({where: {Server_ID: Server_ID }})
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} } 
  }
  // 获取外卖订单
  async getTakeOutList(body) {
    let {Server_ID } = body
    try {
      let res = await takeoutModule.findAll({where: {Server_ID: Server_ID }})
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} } 
  }
  // 删除用户
  async deleteItem(data) {
    let {id} = data
    if(!id) {return {code: 0, msg: '缺少id'}}
    try {
      this.instance.destroy({where:{id:id}})
      return {code: 1, data: '删除成功'}
    } catch(err) { return {code: 0, msg: err.toString()}}
  }
}

module.exports = new userCto()