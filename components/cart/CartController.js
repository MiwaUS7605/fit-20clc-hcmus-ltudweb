const laundryService = require('./LaundryService');
const authService = require('../auth/AuthService');
const createError = require('http-errors');
const qs = require('qs');
const db = require('../../db');

class CartController {

    async displayCart(req, res, next) {
        let email = res.locals.user.email;
        if (!email) return;
        const idUser = await authService.getUserIdByEmail(email);

        let services = [];
        services = await laundryService.getcart(idUser['idcustomer']);

        if (!services) return next(createError(404));
        console.log(services);

        var sub_total = await laundryService.getSubtotal(services);

        res.render('users/shopping-cart', { services, sub_total});
    }

    async addToCart(req, res, next) {
        const idService = req.body.idservice;
        if (!idService) return;

        const service = await laundryService.get(idService);
        console.log(service);//
        if (!service) return;

        let email = res.locals.user.email;
        if (!email) return;

        const idUser = await authService.getUserIdByEmail(email);

        // const check = await laundryService.checkcart(idUser, idService);
        // if (check.idservice) return;

        await laundryService.addtocart(idUser['idcustomer'], idService);
    }

    async removeFromCart(req, res, next) {
        const idService = req.body.idservice;
        if (!idService) return;

        let email = res.locals.user.email;
        //if (!email) return;

        const idUser = await authService.getUserIdByEmail(email);
        
        const promise = await laundryService.removefromcart(idUser['idcustomer'], idService);
    }

}

module.exports = new CartController;