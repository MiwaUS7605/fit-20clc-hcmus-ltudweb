const laundryService = require('./LaundryService');
const createError = require('http-errors');
const qs = require('qs');

class CartController {    
    async addToCart(req, res, next) {
        
        console.log("alkfsnlwknfwe");
        const id = req.body.idservice;
        console.log(req.body);
        res.json({});
    }
}

module.exports = new CartController;