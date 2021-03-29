const gameModule = require('../../model').Game;
const systemRequirementModule = require('../../model').SystemRequirement

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
      let res = await this.instance.create({ name: name, desc: desc, img_list: img_list, release_date: release_date, developer: developer, publisher: publisher, game_type: game_type, price: price, is_onshelf: is_onshelf })
      return { code: 1, data: '创建成功', goodId: res.id }
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
    const { id } = data
    if (!id) {
      return { code: 0, msg: '缺少id' }
    }
    try {
      let res = await this.instance.findAll({
        where: { id: id }, 
        include: [{
          model: systemRequirementModule,
          where: { game_id: id },
          // required: false  //left join
        }]
      })
      if (res.length > 0) {
        return { code: 1, data: res[0] }
      } else {
        return { code: 0, msg: '无此商品' }
      }
    } catch (err) {
      console.log('error',err)
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
  // 删除
  async deleteGameById(data) {
    const { id } = data
    if (!id) {
      return { code: 0, msg: '缺少id' }
    }
    try {
      this.instance.deleteItem({ where: { id: id } })
      let hasSR = await systemRequirementModule.findAll({ where: { goods_id: id } })
      if (hasSR.length > 0) {
        let hasSRIds = hasSR.map(a => a.id)
        await systemRequirementModule.deleteItem({ id: hasSRIds })
      }
      return { code: 1, data: '删除成功' }
    } catch (err) { return { code: 0, msg: JSON.stringify(err) } }
  }
  async edit(body) {
    const { id, name, desc, img_list, release_date, developer, publisher, game_type, price, is_onshelf } = body
    try {
      let hasOne = await this.instance.findAll({ where: { id: id } })
      if (hasOne.length < 1) {
        return { code: 0, msg: '无此数据' }
      }
      this.instance.update({ name: name, desc: desc, img_list: img_list, release_date: release_date, developer: developer, publisher: publisher, game_type: game_type, price: price, is_onshelf: is_onshelf }, { where: { id: id } })
      return { code: 1, data: '修改成功' }
    }
    catch (err) {
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
}

module.exports = new gameCto()