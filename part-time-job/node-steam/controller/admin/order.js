const Order = require('../../model').Order;
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
      await this.instance.create({user_id: user_id, ord_no: ord_no, game_id: game_id, num: num, money: money})
      return {code: 1, data: 'success'}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async updateOrder(body) {
    const { ord_no } = body
    try {
      await this.instance.update({is_finished: 1}, {where: {ord_no: ord_no}})
      return {code: 1, data: 'success'}
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
        where: {ord_no: ord_no,user_id:user_id}})
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
        return { code: 1, data: res[0] }
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