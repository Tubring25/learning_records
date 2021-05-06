var express = require('express');
var router = express.Router();

const loginService = require('../controller/loginCto')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/server/login', async(req,res, next) => {
  res.json(await loginService.login(req.body))
})
router.post('/server/getUserInfo', async(req,res, next) => {
  res.json(await loginService.getUserInfo(req.body.token))
})

module.exports = router;