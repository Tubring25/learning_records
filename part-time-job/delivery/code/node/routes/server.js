var express = require('express');
var router = express.Router();

const serverService = require('../controller/serverCto')

router.post('/regist', async(req,res, next) => {
  res.json(await serverService.register(req.body))
})
router.post('/getExpressList', async(req,res, next) => {
  res.json(await serverService.getExpressList(req.body))
})
router.post('/getTakeOutList', async(req,res, next) => {
  res.json(await serverService.getTakeOutList(req.body))
})

module.exports = router;