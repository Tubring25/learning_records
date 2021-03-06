var express = require('express');
var router = express.Router();

const GameTypeService = require('../../controller/admin/gameTypeCto');
const GameService = require('../../controller/admin/gameCto');
const systemRequirement = require('../../controller/admin/systemRequireCto')
const RecommendService = require('../../controller/admin/recommendCto');
const OrderService = require('../../controller/admin/order')
const UserService = require('../../controller/user/userCto')
const adminService = require('../../controller/admin/adminCto');
const HomeService = require('../../controller/admin/home')

router.get('/getType', async (req, res, next) => {
  res.json(await GameTypeService.getGameTypeList())
})
router.post('/addType', async(req, res, next) => {
  res.json(await GameTypeService.addGameType(req.body))
})
router.post('/editType', async(req, res, next) => {
  res.json(await GameTypeService.editGameType(req.body))
})
router.post('/deleteType', async(req,res, next) => {
  res.json(await GameTypeService.deleteGameType(req.body))
})

router.post('/game/add', async(req, res, next) => {
  res.json(await GameService.create(req.body))
})
router.post('/game/getList', async(req, res, next) => {
  res.json(await GameService.getGameList(req.body))
})
router.post('/game/getGameById', async(req, res, next) => {
  res.json(await GameService.getGameById(req.body))
})
router.post('/game/deleteGameById', async(req,res,next) => {
  res.json(await GameService.deleteGameById(req.body))
})
router.post('/game/editGame', async(req,res, next) => {
  res.json(await GameService.edit(req.body))
})
router.get('/game/bestSaleGame', async(req,res,next) => {
  res.json(await GameService.getBestSaleGames())
})
router.post('/game/getSystemR', async(req, res, next) => {
  res.json(await systemRequirement.getSystemR(req.body))
})
router.post('/game/editSystemR', async(req, res, next) => {
  res.json(await systemRequirement.editSystemR(req.body))
})
router.post('/game/createSystemR', async(req, res, next) => {
  res.json(await systemRequirement.createSystemR(req.body))
})
router.post('/game/upload', async(req,res,next) => {
  res.json(await GameService.uploadSingleImg(req))
})
router.post('/recommend/add', async(req,res,next) => {
  res.json(await RecommendService.addRecommendList(req.body)) 
})
router.post('/recommend/delete', async(req, res, next) => {
  res.json(await RecommendService.deleteRecommond(req.body))
})
router.post('/specsale/add', async(req,res, next) => {
  res.json(await RecommendService.addSpecSaleList(req.body))
})
router.post('/specsale/delete', async(req, res,next) => {
  res.json(await RecommendService.deleteSpecSale(req.body))
})
router.post('/recommend/get', async(req,res,next) => {
  res.json(await RecommendService.getRecommendList(req.body)) 
})
router.post('/specsale/get', async(req, res,next) => {
  res.json(await RecommendService.getSpecSaleList(req.body))
})
router.post('/order/get', async(req, res,next) => {
  res.json(await OrderService.getOrderList(req.body))
})
router.post('/order/getbyId', async(req, res,next) => {
  res.json(await OrderService.getOrderById(req.body))
})
router.post('/order/del', async(req, res,next) => {
  res.json(await OrderService.delOrder(req.body))
})
router.post('/order/update', async(req, res, next) => {
  res.json(await OrderService.updateOrder(req.body))
})

// 获取用户列表
router.post('/user/get', async(req, res, next) => {
  res.json(await UserService.getUserList(req.body))
})
router.post('/user/hadGame', async(req, res, next) => {
  res.json(await UserService.hadGodos(req.body))
})

// 获取管理管理员列表
router.post('/admin/list', async(req,res, next) => {
  res.json(await adminService.getAdminList(req.body))
})
router.post('/admin/add', async(req, res, next) =>{
  res.json(await adminService.addAdmin(req.body))
})
router.post('/admin/update', async(req, res, next) => {
  res.json(await adminService.updateAdmin(req.body))
})
router.post('/admin/del', async(req, res, next) => {
  res.json(await adminService.delAdmin(req.body))
})

router.post('/home/getPane', async(req, res, next) => {
  res.json(await HomeService.getPaneData())
})
router.post('/home/line', async(req,res,next) => {
  res.json(await HomeService.getOrderLine())
})


module.exports = router;