var express = require('express');
var router = express.Router();

const AdminService = require('../controller/adminCto')
const serverService = require('../controller/serverCto')
const CustomerService = require('../controller/customerCto')

router.post('/getCustomerList', async(req,res, next) => {
  res.json(await CustomerService.getUserList(req.body))
})
router.post('/getServerList', async(req,res, next) => {
  res.json(await serverService.getUserList(req.body))
})
router.post('/editCustomer', async(req,res, next) => {
  res.json(await CustomerService.updateInfo(req.body))
})
router.post('/editServer', async(req,res, next) => {
  res.json(await serverService.updateInfo(req.body))
})
router.post('/delCustomer', async(req,res, next) => {
  res.json(await CustomerService.deleteItem(req.body))
})
router.post('/delServer', async(req,res, next) => {
  res.json(await serverService.deleteItem(req.body))
})
router.post('/getFeedbackList', async(req,res, next) => {
  res.json(await AdminService.getFeedbackList(req.body))
})
router.post('/editFeedbackList', async(req,res, next) => {
  res.json(await AdminService.updateFeedback(req.body))
})
module.exports = router;
