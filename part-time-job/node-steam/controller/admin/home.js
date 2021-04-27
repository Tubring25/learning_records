const UserModule = require('../../model').User
const OrderModule = require('../../model').Order
const GameModule = require('../../model').Game
const { Op } = require('sequelize');

class HomeService {
  constructor() {}
  async getPaneData () {
    try {
      let UserNum = await UserModule.count()
      let NewUserNum = await UserModule.count({where: {
        created_at: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000)
        }
      }})
      let TotalMoney = await OrderModule.sum('money')
      let OrderNum = await OrderModule.count()
      return {code: 1, data: {UserNum: UserNum, NewUserNum: NewUserNum, TotalMoney: TotalMoney, OrderNum: OrderNum}}
    }catch(err) { 
      console.log(err)
      return {code: 0, msg: JSON.stringify(err)} }
  }
  async getOrderLine () {
    try {
      let res = await OrderModule.findAll({where: {
        created_at: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000)
        }},
        group: ['created_at']
      })
      let max = await OrderModule.max('money',{where: {
        created_at: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000)
        }}
      })
      let min = await OrderModule.min('money',{where: {
        created_at: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000)
        }}
      })
      return {code:1, data: res, max: max, min: min}
    }catch(err) { 
      console.log(err)
      return {code: 0, msg: JSON.stringify(err)} }
  }
}

module.exports = new HomeService()