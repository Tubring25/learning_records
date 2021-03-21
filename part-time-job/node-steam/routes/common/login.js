var express = require('express');
var router = express.Router();
const userCto = require('../../controller/user/userCto')
const adminCto = require('../../controller/admin/adminCto');

/* GET users listing. */
router.post('/user/register', async (req, res, next) => {
  res.json(await userCto.register(req.body))
})
router.post('/user/login', async(req, res, next) => {
  res.json(await userCto.login(req.body))
})
router.post('/getUserInfo', async (req, res, next) => {
  res.json(await userCto.getUserInfo(req.body.token))
})
router.post('/admin/login', async(req,res, next) => {
  res.json(await adminCto.login(req.body))
})
router.post('/admin/getUserInfo', async(req,res, next) => {
  res.json(await adminCto.getUserInfo(req.body.token))
})

module.exports = router;
