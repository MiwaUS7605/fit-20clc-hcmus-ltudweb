const express = require('express');
const router = express.Router();
const userController = require('../components/users/UserController');

/* GET home page. */

router.get('/home', userController.home);

/* GET check out page. */
router.get('/checkout',userController.checkout);

/* GET contact page. */
router.get('/contact', userController.contact);

/* GET shop detail page. */
router.get('/shop-details', userController.shopdetails);

/* GET shop grid page. */
router.get('/shop-grid', userController.shopgrid);

/* GET shoping cart page. */
router.get('/shoping-cart', userController.shopingcart);

module.exports = router;
