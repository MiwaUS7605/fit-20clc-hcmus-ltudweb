const express = require('express');
const router = express.Router();

const adminController = require('./AdminController');

router.get('/', adminController.index);
// router.get('/:slug', adminController.show);

module.exports = router;