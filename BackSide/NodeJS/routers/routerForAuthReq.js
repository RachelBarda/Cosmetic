const express = require('express')
const routerForAuthReq = express.Router();
const mainController = require('../controllers/controller');
const {signOut } = require('../controllers/auth')

routerForAuthReq.post('/products/addneworder', mainController.createNewOrder);

routerForAuthReq.get('/products/ordershistory', mainController.getOrdersHistory);

routerForAuthReq.get('/products/order/:orderId', mainController.getOrder);

routerForAuthReq.get('/users', mainController.getAllUsers);

routerForAuthReq.get('/contactus/getmessages', mainController.getMessages);

routerForAuthReq.get('/services/history',mainController.getServicesHisroryFromDB);

routerForAuthReq.post('/cservices/history/add', mainController.inserstServiceHistory);







module.exports = routerForAuthReq;