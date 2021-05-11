var express = require('express');
var router = express.Router();

const serverService = require('../controller/serverCto')

router.post('/regist', async(req,res, next) => {
  res.json(await serverService.register(req.body))
})

module.exports = router;