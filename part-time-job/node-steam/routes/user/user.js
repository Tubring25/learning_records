var express = require('express');
var router = express.Router();

const GameTypeService = require('../../controller/admin/gameTypeCto');
const GameService = require('../../controller/admin/gameCto');
const RecommendService = require('../../controller/admin/recommendCto');
const OrderService = require('../../controller/admin/order')

// 首页展示
router.post('/recommend/get', async(req,res,next) => {
  res.json(await RecommendService.getRecommendList(req.body)) 
})
router.post('/specsale/get', async(req, res,next) => {
  res.json(await RecommendService.getSpecSaleList(req.body))
})

// 获取游戏类型
router.get('/getType', async (req, res, next) => {
  res.json(await GameTypeService.getGameTypeList())
})
// 游戏路由
router.post('/game/getList', async(req, res, next) => {
  res.json(await GameService.getGameList(req.body))
})
router.post('/game/getGameById', async(req, res, next) => {
  res.json(await GameService.getGameById(req.body))
})
router.get('/game/newestGames', async(req,res,next) => {
  res.json(await GameService.getNewestGames())
})
router.post('/order/add', async(req, res, next) => {
  res.json(await OrderService.addOrder(req.body))
})
router.post('/order/get', async(req, res, next) => {
  res.json(await OrderService.getOrderList(req.body))
})
router.post('/order/update', async(req, res, next) => {
  res.json(await OrderService.updateOrder(req.body))
})
router.post('/order/getbyId', async(req, res,next) => {
  res.json(await OrderService.getOrderById(req.body))
})


module.exports = router;