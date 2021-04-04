const RecommendModule = require('../../model').Recommend
const SpecSaleModule = require('../../model').SpecialSale
const gameModule = require('../../model').Game

class RecommendCto {
  constructor() {}
  async addRecommendList(body) {
    const ids = body.ids.split(',')
    try {
      let arr = []
      for (let i in ids) {
        let res = await gameModule.findOne({where:{id:Number(i)}})
        console.log(res)
        arr.push(res)
      }
      return {code:1, data: arr}
    }catch(err) { 
      console.log(err)
      return {code: 0, msg: JSON.stringify(err)} }
  }
  async addSpecSaleList(body) {
    const { game_id, game_img, game_name, game_price, game_sale_parice } = body
    try {
      await SpecSaleModule.create({game_id: game_id, game_img:game_img, game_name: game_name, game_price: game_price, game_sale_parice: game_sale_parice})
      return {code:1, data: 'success'}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async deleteRecommond(body) {
    const {id} = body
    try {
      await RecommendModule.destroy({where: {id:id}})
      return {code:1, data: 'success'}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async deleteSpecSale(body) {
    const {id} = body
    try {
      await SpecSaleModule.destroy({where: {id:id}})
      return {code:1, data: 'success'}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async getRecommendList() {
    try {
      let res = await RecommendModule.findAndCountAll()
      return res
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async getSpecSaleList() {
    try {
      let res = await SpecSaleModule.findAndCountAll()
      return res
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
}

module.exports = new RecommendCto()