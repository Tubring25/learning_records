const CommentModule = require('../../model').Comment;
const Game = require('../../model').Game
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
      return { code: 1, data: res }
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
      return { code: 1, data: res}
    } catch (err) {
      console.log('error',err)
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
}

module.exports = new orderService()