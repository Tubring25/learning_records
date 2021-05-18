var express = require('express');
var router = express.Router();

const loginService = require('../controller/loginCto')


router.post('/login', async(req,res, next) => {
  res.json(await loginService.login(req.body))
})
router.post('/getUserInfo', async(req,res, next) => {
  res.json(await loginService.getUserInfo(req.body.token))
})
router.post('/upload', async(req,res, next) => {
  res.json(await loginService.uploadSingleImg(req))
})
module.exports = router;