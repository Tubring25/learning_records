const adminModule = require('../model').Admin;
const CustomerModule = require('../model').Customer
const ServerModule = require('../model').Server
const { createToken, verifyToken } = require('../utils/index')

class adminCto {
  constructor() {
    this.instance = adminModule
  }
  async login (body) {
    let {username, password, type} = body
		if (!username) {
			return {code: 0, msg: '缺少用户名'}
		} else if (!password) {
			return { code: 0, msg: "缺少密码" };
		} else {
			try{
        let res
        switch (type) {
          case 0:
            res = await this.instance.findAll({ where: { Manager_Name: username } });
            break;
          case 1:
            res = await this.instance.findAll({ where: { Server_Name: username } });
            break;
          case 2:
            res = await this.instance.findAll({ where: { Customer_Name: username } });
            break;
          default:
            break;
        }
        if(res.length == 0) {
          return { code: 0, msg: '查无此用户' };
        } else {
          let code
          switch (type) {
            case 0:
              code = 'Manager_Code'
              break;
            case 1:
              code = 'Server_Code'
              break;
            case 2:
              code = 'Customer_Code'
              break;
            default:
              break;
          }
          if (res[0][code] == password) {
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
		if (res.data){
			return {code: 1, data: res.data}
		} else {
			return {code: 3, data: res}
		}
	}
}

module.exports = new adminCto()