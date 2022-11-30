const express = require('express');
const router = express.Router();

const adminController = require('./AdminController');

router.get('/', adminController.dashboard);
router.get('/revenue', adminController.revenue);
router.get('/basic-table', adminController.list);
router.get('/icon', adminController.list);
router.get('/google-map', adminController.list);
router.get('/blank-page', adminController.list);
router.get('/404', adminController.list);

module.exports = router;