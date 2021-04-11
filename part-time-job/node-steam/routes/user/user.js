var express = require('express');
var router = express.Router();

const GameTypeService = require('../../controller/admin/gameTypeCto');
const GameService = require('../../controller/admin/gameCto');
const RecommendService = require('../../controller/admin/recommendCto');


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


module.exports = router;