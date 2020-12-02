const router = require('koa-router')()
const shoppingCartCto = require('../controller/shoppingCartCto')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post("/getShoppingCart", shoppingCartCto.getShoppingCart);

module.exports = router
