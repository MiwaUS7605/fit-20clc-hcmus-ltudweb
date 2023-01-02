const db = require('../../db');
const serviceController = require('../services/ServiceController');

class UserController {
    // home(req,res){
    //     res.render('users/home',{ title: 'Home' , layout: 'user-layout'});
    // }
    checkout(req,res) {
        res.render('users/checkout',{ title: 'Check out', layout: 'user-layout' });
    }
    contact(req,res) {
        res.render('users/contact',{ title: 'Contact', layout: 'user-layout' });
    }
    shoppingcart(req,res) {
        res.render('users/shopping-cart',{ title: 'Shopping cart', layout: 'user-layout' });
    }
    // shopgrid(req,res) {
    //     res.render('users/shop-grid',{ title: 'Shop grid', layout: 'user-layout' });
    // }
    // shopdetails(req,res) {
    //     res.render('users/shop-details',{ title: 'Shop detail', layout: 'user-layout' });
    // }
}

module.exports = new UserController;
