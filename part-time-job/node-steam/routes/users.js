var express = require('express');
var router = express.Router();
const userCto = require('../controller/userCto')

/* GET users listing. */
router.post('/register', async (req, res, next) => {
  res.json(await userCto.register(req.body))
})

module.exports = router;
