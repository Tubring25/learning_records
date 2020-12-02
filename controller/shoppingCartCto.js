const shoppingCartModel = require('../model/shoppingCartModel');

class shoppingCartCto {
  /**
   * 获取购物车信息
   */
  static async getShoppingCart(ctx) {
    const { id } = ctx.request.body;
    if (id) {
      try {
        let data = await shoppingCartModel.findAll({ where: { user_id: id } });
        ctx.response.status = 200;
        ctx.body = { code: 200, msg: "查询成功", data };
      } catch (err) {
        ctx.response.status = 0;
        ctx.body = { code: 0, msg: "查询失败", data };
      }
    } else {
      ctx.response.status = 0;
      ctx.body = {
        code: 0,
        msg: "缺少user_id",
      };
    }
  }
}

module.exports = shoppingCartCto;