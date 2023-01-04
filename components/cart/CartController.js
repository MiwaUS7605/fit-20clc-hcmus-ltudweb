const laundryService = require('./LaundryService');
const authService = require('../auth/AuthService');
const createError = require('http-errors');
const qs = require('qs');
const db = require('../../db');

class CartController {

    async displayCart(req, res, next) {
        try{
            let email = res.locals.user.email;
            if (!email) return;
            const idUser = await authService.getUserIdByEmail(email);
            
            let services = [];
            services = await laundryService.getcart(idUser['idcustomer']);
    
            if (!services) return next(createError(404));
            console.log(services);
    
            var sub_total = await laundryService.getSubtotal(services);
    
            res.render('users/shopping-cart', { services, sub_total});

        }catch(e){
            res.render('users/home', {error: e.message});
            return;
        }
    }

    async addToCart(req, res, next) {
        let email = res.locals.user.email;
        if (!email) {
            res.redirect('/');
            return;
        }
        let message = "Already in your cart";
        const idService = req.body.idservice;
        if (!idService) return;

        const idUser = await authService.getUserIdByEmail(email);
        const serviceFromUser = await laundryService.getServiceFromUser(idUser['idcustomer'], idService);
        if (!serviceFromUser) {
            await laundryService.addtocart(idUser['idcustomer'], idService);
            message = "Successfully!";
        }
        res.json({message: message});
    }

    async removeFromCart(req, res, next) {
        const idService = req.body.idservice;
        if (!idService) return;

        let email = res.locals.user.email;
        //if (!email) return;

        const idUser = await authService.getUserIdByEmail(email);
        
        await laundryService.removefromcart(idUser['idcustomer'], idService);
    }

    async incrQuantity(req, res, next) {
        const {idservice: idService}= req.body;
        if (!idService) return;

        let email = res.locals.user.email;
        if (!email) return;
        
        const idUser = await authService.getUserIdByEmail(email);
        
        await laundryService.incrQuantity(idUser['idcustomer'], idService);
    }

    async descQuantity(req, res, next) {
        const {idservice: idService}= req.body;
        if (!idService) return;

        let email = res.locals.user.email;
        if (!email) return;

        const idUser = await authService.getUserIdByEmail(email);
        
        await laundryService.descQuantity(idUser['idcustomer'], idService);
    }

}

module.exports = new CartController;