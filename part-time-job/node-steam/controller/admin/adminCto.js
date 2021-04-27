const adminModule = require('../../model/index').Admin;
const { createToken, verifyToken } = require('../../utils/index')

class adminCto {
  constructor() {
    this.instance = adminModule
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
  async getAdminList () {
    try {
      let res = await this.instance.findAll()
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async addAdmin(body) {
    const { username, password, phone, email, avatar, permission } = body
    try {
      let hasOne = await this.instance.findAll({where:{username: username}})
      if(hasOne.length>0) {
        return {code: 0, msg: '用户名已存在'}
      }
      let res = await this.instance.create({username: username, password: password, phone: phone, email: email, avatar: avatar, permission: permission})
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async updateAdmin(body) {
    const { id, username, password, phone, email, avatar, permission } = body
    try {
      let hasOne = await this.instance.findAll({where:{id: id}})
      if(!hasOne) {
        return {code: 0, msg: '用户不存在'}
      }
      let res = await this.instance.update({username: username, password: password, phone: phone, email: email, avatar: avatar, permission: permission}, {where: {id: id}})
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async delAdmin(body) {
    const {id} = body
    try {
      let hasOne = await this.instance.findAll({where:{id: id}})
      if(hasOne) {
        return {code: 0, msg: '用户不存在'}
      }
      let res = await this.instance.destroy({where: {id: id}})
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
}

module.exports = new adminCto()