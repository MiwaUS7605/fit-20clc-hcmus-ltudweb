const laundryService = require('./LaundryService');
const createError = require('http-errors');
const qs = require('qs');
const db = require('../../db');

class CartController {    
    async addToCart(req, res, next) {
        const id = req.body.idservice;
        console.log(id);
        if(!id) return;

        const service = await laundryService.get(id);
        if (!service) return;
        // res.json({});

        try {
            console.log(res.locals.user);

            let userId = res.locals.user.id;
            // if (!userId) return;
            await laundryService.addtocart(userId, id);
          } catch (e) {
            res.render('account/edit', { error: e.message });
            return;
          }
    }
    
    async displayCart(req, res, next) {
        let userId = res.locals.user.id;
        // if (!userId) return;
        let services = [];
        services = await laundryService.getcart(userId);

        if (!services) return next(createError(404));
        res.render('users/shopping-cart', {services}); 
    }
}

module.exports = new CartController;