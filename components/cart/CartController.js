const laundryService = require('./LaundryService');
const authService = require('../auth/AuthService');
const createError = require('http-errors');
const qs = require('qs');
const db = require('../../db');

class CartController {
    async addToCart(req, res, next) {
        const idService = req.body.idservice;
        console.log(idService);//
        if (!idService) return;

        const service = await laundryService.get(idService);
        console.log(service);//
        if (!service) return;

        try {
            console.log(res.locals.user);//

            let email = res.locals.user.email;
            if (!email) return;
            const idUser = await authService.getUserIdByEmail(email);
            await laundryService.addtocart(idUser['idcustomer'], idService);
        } catch (e) {
            res.render('users/shopping-cart', { error: e.message });
        }
    }

    async displayCart(req, res, next) {
        let email = res.locals.user.email;
        if (!email) return;
        const idUser = await authService.getUserIdByEmail(email);

        let services = [];
        services = await laundryService.getcart(idUser['idcustomer']);

        if (!services) return next(createError(404));
        res.render('users/shopping-cart', { services });
    }
}

module.exports = new CartController;