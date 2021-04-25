const Order = require('../../model').Order;
const Game = require('../../model').Game
const GameImg = require('../../model').GameImg
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class orderService {
  constructor() {
    this.instance = Order
  }
  async addOrder(body) {
    const { user_id, game_id, num, money } = body
    try {
      let timestamp = new Date().getTime()
      let ranNum = Math.floor(Math.random() * 1000)
      let ord_no = `${timestamp}${ranNum}`;
      let res
      if(body.is_fin == false) {
        res = await this.instance.create({user_id: user_id, order_no: ord_no, game_id: game_id, num: num, money: money, is_finished: false})
      } else {
        res = await this.instance.create({user_id: user_id, order_no: ord_no, game_id: game_id, num: num, money: money, is_finished: true})
        let ids = game_id.split(',')
        let gameArr = await Game.findAll({where: {id: ids}})
        for(let i in gameArr) {
          gameArr[i].sale_num = Number(gameArr[i].sale_num) + 1
          await Game.update({sale_num: gameArr[i].sale_num}, {where: {id: gameArr[i].id}})
        }
      }
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async updateOrder(body) {
    const { id } = body
    try {
      let res = await this.instance.update({is_finished: 1}, {where: {id: id}})
      let Order = await this.instance.findAll({where: {id: id}})
      let ids = Order[0].game_id.split(',')
      let gameArr = await Game.findAll({where: {id: ids}})
      for(let i in gameArr) {
        gameArr[i].sale_num = Number(gameArr[i].sale_num) + 1
        await Game.update({sale_num: gameArr[i].sale_num}, {where: {id: gameArr[i].id}})
      }
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async delOrder (body) {
    const { ord_no } = body
    try {
      await this.instance.destroy({where: { ord_no: ord_no }})
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async getOrderList(body) {
    try {
      let {pageSize, pageNum, ord_no, user_id} = body
      
      let res = await this.instance.findAndCountAll({
        limit: Number(pageSize),
        offset: Number(pageNum - 1) * Number(pageSize),
        where: {order_no: {[Op.like]: `%${ord_no}%`},user_id:{[Op.like]: `%${user_id}%`}}})
      return { code: 1, data: res }
    } catch (err) { 
      console.log(err)
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
  async getOrderById(data) {
    const { id } = data
    if (!id) {
      return { code: 0, msg: '缺少id' }
    }
    try {
      let res = await this.instance.findAll({
        where: { id: id }, 
      })
      
      if (res.length > 0) {
        let ids = res[0].game_id.split(',')
        let gameArr = await Game.findAll({where: {id: ids},include: [
          {model: GameImg, where: {game_id: ids}}
        ]})
        let postObj = {id: res[0].id,ord_no: res[0].order_no, money: res[0].money, is_finished: res[0].is_finished, created_at: res[0].created_at, updated_at: res[0].updated_at, user_id: res[0].user_id, game: gameArr}
        postObj.test = 111
        return { code: 1, data: postObj }
      } else {
        return { code: 0, msg: '无此订单' }
      }
    } catch (err) {
      console.log('error',err)
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
}

module.exports = new orderService()