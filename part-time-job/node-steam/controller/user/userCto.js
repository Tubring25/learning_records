const userModel = require('../../model/user/user');
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
}

module.exports = new userCto()