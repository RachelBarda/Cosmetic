const express = require('express')
const router = express.Router();
const mainController = require('../controllers/controller');

router.get('/services/:id', mainController.getServiceByServiceId);

router.post('/users/add', mainController.insertUsertoDB)

router.get('/products',mainController.getAllProducts)

router.get('/products/:id',mainController.getProductByProductId)

router.get('/users/:emailAddr',mainController.getPhoneByEmailAddr)

router.get('/services',mainController.getAllservices)

router.get('/futureservices',mainController.getFutureServicesFromDB)

router.get('/activitiesservices/days',mainController.getServicesActivitesDays)

router.get('/users/roles/:emailAddr',mainController.getRoleByUserEmail)

router.get('/users/isExist/:emailAddr', mainController.isUserExist)

router.post('/contactus/messages', mainController.insertMessageFromContact)

module.exports = router;