const laundryService = require('./LaundryService');
const createError = require('http-errors');
const qs = require('qs');
const db = require('../../db');

class CartController {    
    async addToCart(req, res, next) {
        const id = req.body.idservice;
        const service = await laundryService.get(id);
        res.json({});

        //let {res.locals.user.id, id} = req.body;

    }
    
    async displayCart(req, res, next) {
        
    }
}

module.exports = new CartController;