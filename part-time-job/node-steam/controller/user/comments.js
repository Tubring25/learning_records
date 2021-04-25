const CommentModule = require('../../model').Comment;
const UserModule = require('../../model').User
const GameModule = require('../../model').Game
const GameImg = require('../../model').GameImg
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class orderService {
  constructor() {
    this.instance = CommentModule
  }
  async addComment(body) {
    const { user_id, game_id, content, buy_from } = body
    try {
      let res = await this.instance.create({user_id: user_id, content: content, game_id: game_id, buy_from: buy_from})
      return {code: 1, data: res}
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async delComment (body) {
    const { id } = body
    try {
      await this.instance.destroy({where: { id: id }})
    }catch(err) { return {code: 0, msg: JSON.stringify(err)} }
  }
  async getCommentList(body) {
    try {
      let {pageSize, pageNum, game_id} = body
      let res = await this.instance.findAndCountAll({
        limit: Number(pageSize),
        offset: Number(pageNum - 1) * Number(pageSize),
        where: {game_id:game_id}})
      let returnRes = []
      let userIds = res.rows.map(a=>a.user_id)
      let userArr = await UserModule.findAll({where: {id: userIds}})
      for(let i in res.rows) {
        for(let j in userArr) {
          if(res.rows[i].user_id == userArr[j].id) {
            returnRes.push({username: userArr[j].username, avatar: userArr[j].avatar, content: res.rows[i].content})
          }
        }
      }
      return { code: 1, data: {count: res.count, rows: returnRes} }
    } catch (err) { 
      console.log(err)
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
  async getCommentByUserId(data) {
    const { user_id } = data
    try {
      let res = await this.instance.findAll({
        where: { user_id: user_id }, 
      })
      let gameIds = res.map(a=>a.game_id)
      let gameArr = await GameModule.findAll(
        {where: {id: gameIds},
        include: [
          {model: GameImg, where: {game_id: gameIds}}
        ]})
      
      let returnRes = []
      for(let i in res) {
        for(let j in gameArr) {
          if(res[i].game_id == gameArr[j].id) {
            returnRes.push({game_name: gameArr[j].name, img: gameArr[j].GameImgs[0].path, content: res[i].content})
          }
        }
      }

      return { code: 1, data: returnRes}
    } catch (err) {
      console.log('error',err)
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
}

module.exports = new orderService()