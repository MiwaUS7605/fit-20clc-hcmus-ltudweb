const express = require('express');
const router = express.Router();

const adminController = require('../components/admin/AdminController');
const customerListController=require('../components/customerList/CustomerListController');
const serviceListController = require('../components/serviceList/ServiceListController');
const orderListController = require('../components/orderList/OrderListController');

router.get('/', adminController.dashboard);
router.get('/dashboard', adminController.dashboard);
router.get('/revenue', adminController.revenue);
router.get('/chat', adminController.chat);
router.get('/feedback', adminController.feedback);
router.get('/google-map', adminController.location);
router.get('/signin', adminController.signin);
router.get('/edit-profile', adminController.editprofile);
router.get('/customer-list',customerListController.list);
router.get('/service-list',serviceListController.list);
router.post('/service-list',serviceListController.list);
router.get('/service-list/create-info',serviceListController.showCreateInfoService);
router.post('/service-list/create-info',serviceListController.createService);
router.get('/service-list/create-image',serviceListController.showCreateImageService);
router.post('/service-list/create-image',serviceListController.insertImg);
router.get('/service-list/edit',serviceListController.showEditService);
router.post('/service-list/delete',serviceListController.deleteService);

router.get('/order-history',orderListController.list);
router.post('/order-history',orderListController.updatestatus);

module.exports = router;