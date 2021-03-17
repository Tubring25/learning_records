var express = require('express');
var router = express.Router();

const GameTypeService = require('../../controller/admin/gameTypeCto');

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

module.exports = router;