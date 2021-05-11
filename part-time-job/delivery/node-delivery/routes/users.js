var express = require('express');
var router = express.Router();

const CustomerService = require('../controller/customerCto')

router.post('/regist', async(req,res, next) => {
  res.json(await CustomerService.register(req.body))
})

module.exports = router;