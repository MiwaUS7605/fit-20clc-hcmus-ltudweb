const laundryService = require('./LaundryService');
const authService = require('../auth/AuthService');
const createError = require('http-errors');
const qs = require('qs');
const Paginator = require('paginator');

class ServiceController {    
    async list(req, res, next) {
        const { search: nameFilter,
            category: categoryFilter,
            sort: sortFilter,
            from: minPrice,
            to: maxPrice, 
            page: currentPage} = req.query;

        let services = [];

        if (nameFilter || categoryFilter || minPrice || maxPrice||sortFilter) {
            services = await laundryService.filter(nameFilter,categoryFilter,minPrice,maxPrice,sortFilter);
        }
        else {
            services = await laundryService.getAll();
        }
        const { page, ...withoutSort } = req.query;
        //Render services results
        const countResult = Object.keys(services).length;
        //Paginate results
        const items_per_page = 6;
        const range_paginate = 4;
        var paginator = new Paginator(items_per_page,range_paginate);
        var pagination_info = paginator.build(countResult, currentPage); 
        
        res.render('users/shop-grid', { services, 
                                        originalUrl: `${req.baseUrl}/shop-grid?${qs.stringify(withoutSort)}`, 
                                        countResult, 
                                        pagination_info, 
                                        items_per_page});
    }

    async details(req, res, next) {
        const serviceId = req.params['serviceId'];
        const service = await laundryService.get(serviceId);
        if (!service) return next(createError(404));

        const type = service.idtype;
        let products = [];
        if (type) {
            products = await laundryService.sorttype(type,4);
        }
        else {
            products = await laundryService.getNumber(4);
        }
        if (!products) return next(createError(404));

        let ratings = [];
        
        ratings = await laundryService.getrating(serviceId);
        const countResult = Object.keys(ratings).length;
        
        res.render('users/shop-details', { service,products,ratings,countResult});
    }

    async featuredproducts(req, res, next) {
        const serviceType = req.query.featureproducts;
        let services = [];
        if (serviceType) {
            services = await laundryService.sorttype(serviceType,8);
        }
        else {
            services = await laundryService.getNumber(8);
        }
        if (!services) return next(createError(404));
        const { sort, ...withoutSort } = req.query;
        res.render('users/home',  { services, originalUrl: `${req.baseUrl}?${qs.stringify(withoutSort)}`});
    }

    async ratingproduct(req, res) {
        try{ 
            const { rate,message, idservice } = req.body;

            console.log(rate, message, idservice);

            
            let email = res.locals.user.email;
            //if (!email) return;
            
            const iduser = await authService.getUserIdByEmail(email);
            await laundryService.rating(rate,message,idservice,iduser['idcustomer']);
            console.log(iduser);
        }catch(e){
            console.log(e.message);
            return;
        }
    }
}

module.exports = new ServiceController;