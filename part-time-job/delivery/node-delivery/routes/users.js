var express = require('express');
var router = express.Router();

const loginService = require('../controller/loginCto')
const AdminService = require('../controller/adminCto')


router.post('/customer/login', async(req,res, next) => {
  res.json(await loginService.login(req.body))
})
router.post('/customer/getUserInfo', async(req,res, next) => {
  res.json(await loginService.getUserInfo(req.body.token))
})

module.exports = router;
module.exports = router;