const gameModule = require('../../model/admin/game/game');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')

class gameCto {
  constructor() {
    this.instance = gameModule
  }
  async create(body) {
    const { name, desc, img_list, release_date, developer, publisher, game_type, price, is_onshelf } = body
    try {
      let hasOne = await this.instance.findAll({ where: { name: name } })
      if (hasOne.length > 0) {
        return { code: 0, msg: '不可重复添加' }
      }
      this.instance.create({ name: name, desc: desc, img_list: img_list, release_date: release_date, developer: developer, publisher: publisher, game_type: game_type, price: price, is_onshelf: is_onshelf })
      return { code: 1, data: '添加成功' }
    }
    catch (err) {
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
  // 获取
  async getGameList() {
    try {
      let res = await this.instance.findAll()
      return { code: 1, data: res }
    } catch (err) { return { code: 0, msg: JSON.stringify(err) } }
  }
  // 获取单独一条
  async getGameById(data) {
    const {id} = data
    if(!id) {
      return {code: 0, msg:'缺少id'}
    }
    try {
      let res = await this.instance.findAll({where: {id: id}})
      return { code:1, data: res }
    } catch (err) { return { code: 0, msg: JSON.stringify(err) } }
  }
  // 删除
  async deleteGameById(data) {
    const { id } = data
    if(!id) {
      return {code: 0, msg:'缺少id'}
    }
    try {
      this.instance.deleteItem({where: {id: id}})
      return {code: 1, data: '删除成功'}
    } catch (err) { return { code: 0, msg: JSON.stringify(err) } }
  }
  async edit(body) {
    const {id, name, desc, img_list, release_date, developer, publisher, game_type, price, is_onshelf } = body
    try {
      let hasOne = await this.instance.findAll({ where: { id: id } })
      if (hasOne.length < 1) {
        return { code: 0, msg: '无此数据' }
      }
      this.instance.update({ name: name, desc: desc, img_list: img_list, release_date: release_date, developer: developer, publisher: publisher, game_type: game_type, price: price, is_onshelf: is_onshelf }, {where: {id: id}})
      return { code: 1, data: '修改成功' }
    }
    catch (err) {
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
}

module.exports = new gameCto()