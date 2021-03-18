const gameModule = require('../../model/admin/game/game');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')

class gameCto {
  constructor() {
    this.instance = gameModule
  }
  async create(body) {
    const { name, desc, img_list, release_date, developer, publisher, game_type, platform, price, is_onshelf } = body
    try {
      let hasOne = await this.instance.findAll({where: {name: name}})
      if (hasOne.length > 0 ) {
        return { code: 0, msg: '不可重复添加'}
      }
      this.instance.create({name: name, desc: desc, img_list: img_list, release_date: release_date, developer: developer, publisher: publisher, game_type: game_type, platform: platform, price: price, is_onshelf: is_onshelf})
      return {code: 1, data: '添加成功'}
    }
    catch(err) {
      return {code: 0, msg: JSON.stringify(err)}
    }
  }
}

module.exports = new gameCto()