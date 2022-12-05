const express = require('express');
const router = express.Router();

const serviceController = require('./ServiceController');

/* GET home page. */

router.get('/', serviceController.list);
router.get('/:serviceId', serviceController.details);


module.exports = router;
