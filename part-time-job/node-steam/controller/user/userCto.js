const userModel = require('../../model').User;
const orderModule = require('../../model').Order
const gameModule = require('../../model').Game
const gameImgModule = require('../../model').GameImg
const { Op } = require('sequelize');
const { createToken, verifyToken } = require('../../utils/index')

class userCto {
  constructor() {
    this.instance = userModel
  }
  async register(body) {
    let { email, password, username } = body
    if(!email || !password || !username) {
      return {code: 0, msg: '缺少信息'}
    }
    try {
      let hasOne = await this.instance.findAll({
        where: {
          [Op.or]: [{email: email}, {username: username}]
        }
      })
      if(hasOne.length>0) {
        return {code: 0, msg: '邮箱或用户名已存在'}
      }
      this.instance.create({email: email, password: password, username: username})
      return {code:1, data: '创建成功'}
    }
    catch (err) {
      console.log('err',err);
      return {code: 0, msg: JSON.stringify(err)}
    }
  }
  async login (body) {
		if (!body.username) {
			return {code: 0, msg: '缺少用户名'}
		} else if (!body.password) {
			return { code: 0, msg: "缺少密码" };
		} else {
			try{
        let res = await this.instance.findAll({ where: { username: body.username } });
        if(res.length == 0) {
          return { code: 0, msg: '查无此用户' };
        } else {
          if (res[0].password == body.password) {
            delete res[0].password
            return { code: 1, data: {token: createToken(res[0])} };
          } else {
            return { code: 0, msg: '密码错误'};
          }
        }
      }
      catch (err) {
        console.log('err',err);
        return {code: 0, msg: JSON.stringify(err)}
      }
		}
	}
  getUserInfo(token){
		let res = verifyToken(token)
		delete res.data.password
		if (res.data){
			return {code: 1, data: res.data}
		} else {
			return {code: 3, data: res}
		}
	}
  async updateInfo(body) {
    let { id, username, phone, email, description, avatar} = body
    try {
      let res = await this.instance.update({username: username, phone: phone, email: email, description: description, avatar: avatar}, {where: {id: id}})
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async hadGodos(body) {
    let { user_id } = body
    try {
      let resArr = await orderModule.findAll({where: {user_id: user_id}})
      let idsArr = []
      resArr.map(a=>{
        let itemArr = a.game_id.split(',')
        idsArr = [...idsArr, ...itemArr]
      })
      let gameArr = await gameModule.findAndCount({
        where: {id: idsArr},
        include: [
          {model: gameImgModule, where: {game_id: idsArr}, limit:1}
        ],
      })
      return {code: 1, data: gameArr}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async getUserList(body) {
    try {
      let user
      if(body.id) {
        let {id} = body
        user = await userModel.findAndCountAll({attributes: ['id', 'username', 'phone', 'email', 'description', 'avatar', 'created_at'], where: {id: id}})
      } else {
        user = await userModel.findAndCountAll({attributes: ['id', 'username', 'phone', 'email', 'description', 'avatar', 'created_at']})
      }
      
      let res = []
      for (let i =0; i<user.count; i++) {
        let order = await orderModule.findAndCountAll({where: {user_id: user.rows[i].id}})
        let buyNum = order.count
        let buyMoney = 0
        if(order.count>0) {
          order.rows.map(a=>{
            buyMoney+=Number(a.money)
          })
        }
        delete user.rows[i].password
        res.push({baseInfo: user.rows[i], orderInfo: {num: buyNum, money: buyMoney}})
      }
      return {code: 1, data: res}
    }catch(err) { 
      console.log(err)
      return {code: 0, msg: JSON.stringify(err)} }
  }

}

module.exports = new userCto()