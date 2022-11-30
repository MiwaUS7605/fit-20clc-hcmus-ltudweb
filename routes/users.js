var express = require('express');
var router = express.Router();
const userController = require('../components/users/userController');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('users/users', { title: 'Home' });
// });

// /* GET check out page. */
// router.get('/checkout', function(req, res, next) {
//   res.render('users/checkout', { title: 'Check out' });
// });

// /* GET home page. */
// router.get('/contact', function(req, res, next) {
//   res.render('users/contact', { title: 'Contact' });
// });

// /* GET shop detail page. */
// router.get('/shop-details', function(req, res, next) {
//   res.render('users/shop-details', { title: 'Shop detail' });
// });

// /* GET shop grid page. */
// router.get('/shop-grid', function(req, res, next) {
//   res.render('users/shop-grid', { title: 'Shop grid' });
// });

// /* GET shoping cart page. */
// router.get('/shoping-cart', function(req, res, next) {
//   res.render('users/shoping-cart', { title: 'Shoping Cart' });
// });

/* GET home page. */

router.get('/users/', userController.home);
router.get('/users', userController.home);

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
