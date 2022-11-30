const express = require('express');
const router = express.Router();

const adminController = require('./AdminController');

router.get('/', adminController.index);
router.get('/dashboard', adminController.show);
router.get('/dashboard/profile', adminController.show);
router.get('/dashboard/basic-table', adminController.show);
router.get('/dashboard/icon', adminController.show);
router.get('/dashboard/google-map', adminController.show);
router.get('/dashboard/blank-page', adminController.show);
router.get('/dashboard/404', adminController.show);



module.exports = router;