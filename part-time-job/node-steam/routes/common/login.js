var express = require('express');
var router = express.Router();
const userCto = require('../../controller/user/loginCto')

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

module.exports = router;
