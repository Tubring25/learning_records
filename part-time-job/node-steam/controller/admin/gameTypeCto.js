const gameTypeModule = require('../../model').GameType;
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class gameTypeService {
  constructor() {
    this.instance = gameTypeModule
  }
  // 获取
  async getGameTypeList (data) {
    try {
      let res = await this.instance.findAll()
      return {code:1, data: res}
    }catch(err) {return {code: 0, msg: JSON.stringify(err)}}
  }
  // 添加分类
  async addGameType (data) {
    const {name} = data
    if(!name) {
      return {code: 0, msg: '缺少字段'}
    }
    try {
      let hasOne = await this.instance.findAll({where: {name: name}})
      if (hasOne.length > 0 ) {
        return { code: 0, msg: '不可重复添加'}
      }
      this.instance.create({name: name})
      return {code: 1 , data: '添加成功'}
    } catch(err) { 
      console.log();
      return {code: 0, msg: err.toString()}
    }
  }
  // 修改分类
  async editGameType (data) {
    const {id, name} = data
    if(!id || !name) {
      return {code: 0, msg: '缺少字段'}
    }
    try {
      let hasOne = await this.instance.findAll({where: {id:id}})
      if (hasOne.length == 0 ) {
        return { code: 0, msg: '无此数据'}
      }
      this.instance.update({name: name}, {where:{id:id}})
      return { code: 1, data: '修改成功' }
    } 
    catch(err) { return {code: 0, msg: err.toString()}}
  }
  // 删除分类
  async deleteGameType(data) {
    let {id} = data
    if(!id) {return {code: 0, msg: '缺少id'}}
    try {
      this.instance.deleteItem({where:{id:id}})
      return {code: 1, data: '删除成功'}
    } catch(err) { return {code: 0, msg: err.toString()}}
  }
}
module.exports = new gameTypeService()