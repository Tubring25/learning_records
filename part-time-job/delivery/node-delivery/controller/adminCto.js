const adminModule = require('../model').Admin;
const userModel = require('../model').Customer;
const feedbackModule = require('../model').Feedback
const expressageModule = require('../model').expressage
const takeoutModule = require('../model').takeout
const serverModule = require('../model').Server;

const { createToken, verifyToken } = require('../utils/index')

class adminCto {
  constructor() {
    this.instance = adminModule
  }
  async login(body) {
    if (!body.username) {
      return { code: 0, msg: '缺少用户名' }
    } else if (!body.password) {
      return { code: 0, msg: "缺少密码" };
    } else {
      try {
        let res = await this.instance.findAll({ where: { username: body.username } });
        if (res.length == 0) {
          return { code: 0, msg: '查无此用户' };
        } else {
          if (res[0].password == body.password) {
            delete res[0].password
            return { code: 1, data: { token: createToken(res[0]) } };
          } else {
            return { code: 0, msg: '密码错误' };
          }
        }
      }
      catch (err) {
        console.log('err', err);
        return { code: 0, msg: JSON.stringify(err) }
      }
    }
  }
  getUserInfo(token) {
    let res = verifyToken(token)
    delete res.data.password
    if (res.data) {
      return { code: 1, data: res.data }
    } else {
      return { code: 3, data: res }
    }
  }
  async getFeedbackList(body) {
    try {
      let res = await feedbackModule.findAll()
      return { code: 1, data: res }
    } catch (err) { return { code: 0, msg: JSON.stringify(err) } }
  }
  async updateFeedback(body) {
    const { id, Manager_Content } = body
    try {
      let res = await feedbackModule.update({ Manager_Content: Manager_Content, status: true }, { where: { id: id } })
      return { code: 1, data: "更新成功" }
    } catch (err) { return { code: 0, msg: JSON.stringify(err) } }
  }
}

module.exports = new adminCto()