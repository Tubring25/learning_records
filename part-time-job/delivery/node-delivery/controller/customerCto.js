const userModel = require('../model').Customer;
const { Op } = require('sequelize');
const { createToken, verifyToken } = require('../utils/index')

class userCto {
  constructor() {
    this.instance = userModel
  }
  async register(body) {
    let { Customer_Name, Customer_RealName, Customer_Code, Customer_Phone, Customer_District, Customer_Gender, Customer_Avatar  } = body
    try {
      let hasOne = await this.instance.findAll({
        where: {
          [Op.or]: [{Customer_Name: Customer_Name}, {Customer_Phone: Customer_Phone}]
        }
      })
      if(hasOne.length>0) {
        return {code: 0, msg: '手机号或用户名已存在'}
      }
      this.instance.create({Customer_Name: Customer_Name, Customer_RealName: Customer_RealName, Customer_Code: Customer_Code,
        Customer_Phone:Customer_Phone, Customer_District: Customer_District, Customer_Gender: Customer_Gender, Customer_Avatar: Customer_Avatar
      })
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
        let res = await this.instance.findAll({ where: { Customer_Name: body.username } });
        if(res.length == 0) {
          return { code: 0, msg: '查无此用户' };
        } else {
          if (res[0].Customer_Code == body.password) {
            delete res[0].Customer_Code
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