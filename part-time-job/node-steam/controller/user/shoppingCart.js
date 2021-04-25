const ShoppingCart = require('../../model').ShopCart;
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class shoppingCartService {
  constructor() {
    this.instance = ShoppingCart
  }
  async addShoppingCart(body) {
    const { user_id, game_id } = body
    try {
      let hasOne = await this.instance.findAll({where: {user_id: user_id}})
      let game_ids
      if(hasOne.length>0) {
        let alerdyHas = hasOne[0].game_ids.split(',').find(a=>a == game_id)
        if(alerdyHas) {
          return {code: 0, msg: '已在购物车'}
        } else {
          game_ids = hasOne[0].game_ids + ',' + game_id
          await this.instance.update({game_ids: game_ids}, {where: {id: hasOne[0].id}})
        }
      } else {
        game_ids = game_id
        await this.instance.create({user_id: user_id, game_ids: game_ids})
      }
      return {code: 1, data: 'success'}
    }catch(err) { 
      console.log(err)
      return {code: 0, msg: JSON.stringify(err)} }
  }
  async updateShoppingCart(body) {
    const { user_id, game_ids } = body
    try {
      let res = await this.instance.update({game_ids: game_ids}, {where: {user_id: user_id}})
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async delShoppingCart (body) {
    const { id } = body
    try {
      await this.instance.destroy({where: { user_id: id }})
      return {code:1, data: 'success'}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async getShoppingCartByUserId(data) {
    const { id } = data
    if (!id) {
      return { code: 0, msg: '缺少id' }
    }
    try {
      let res = await this.instance.findAll({
        where: { user_id: id }, 
      })
      if (res.length > 0) {
        return { code: 1, data: res[0] }
      } else {
        return { code: 0, msg: '无数据' }
      }
    } catch (err) {
      console.log('error',err)
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
}

module.exports = new shoppingCartService()