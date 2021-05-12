var express = require('express');
var router = express.Router();

const CustomerService = require('../controller/customerCto')

router.post('/regist', async(req,res, next) => {
  res.json(await CustomerService.register(req.body))
})
router.post('/addExpress', async(req,res, next) => {
  res.json(await CustomerService.addExpress(req.body))
})
router.post('/addTakeOut', async(req,res, next) => {
  res.json(await CustomerService.addTakeOut(req.body))
})
router.post('/getExpressList', async(req,res, next) => {
  res.json(await CustomerService.getExpressList(req.body))
})
router.post('/getTakeOutList', async(req,res, next) => {
  res.json(await CustomerService.getTakeOutList(req.body))
})

module.exports = router;