const express = require('express');
const router = express.Router();

const customerController = require('./CustomerController');

router.get('/', customerController.index);
// router.get('/:slug', customerController.show);

module.exports = router;