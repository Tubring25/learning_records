var express = require('express');
var router = express.Router();

const GameTypeService = require('../../controller/admin/gameTypeCto');
const GameService = require('../../controller/admin/gameCto');

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
  res.json(await GameService.getGameList())
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

module.exports = router;