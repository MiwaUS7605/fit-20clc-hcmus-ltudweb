const serviceListRepo = require('./ServiceListRepository');
const createError = require('http-errors');
const qs = require('qs');
const Paginator = require('paginator');

class ServiceListController {    
    async list(req, res, next) {
        const { search: nameFilter,
            sort: sortFilter,
            page: currentPage} = req.query;

        let services = [];

        if (nameFilter||sortFilter) {
            services = await serviceListRepo.filter(nameFilter,sortFilter);
        }
        else {
            services = await serviceListRepo.getAll();
        }
        const { page, ...withoutSort } = req.query;
        //Render services results
        const countResult = Object.keys(services).length;
        //Paginate results
        const items_per_page = 6;
        const range_paginate = 4;
        var paginator = new Paginator(items_per_page,range_paginate);
        var pagination_info = paginator.build(countResult, currentPage); 
        
        res.render('admin/service-list', {layout: 'admin-layout', services, 
                                        originalUrl: `${req.baseUrl}/service-list?${qs.stringify(withoutSort)}`, 
                                        countResult, 
                                        pagination_info, 
                                        items_per_page});
    }
    async showCreateService (req, res, next){
        res.render('admin/create-service',{layout: 'admin-layout'});
    }
    async showEditService (req, res, next){
        res.render('admin/edit-service',{layout: 'admin-layout'});
    }
    async details(req, res, next) {
        const serviceId = req.params['serviceId'];
        const service = await serviceListRepo.get(serviceId);
        if (!service) return next(createError(404));

        const type = service.idtype;
        let products = [];
        if (type) {
            products = await serviceListRepo.sorttype(type,4);
        }
        else {
            products = await serviceListRepo.getNumber(4);
        }
        if (!products) return next(createError(404));
        res.render('users/shop-details', { service,products});
    }

    async featuredproducts(req, res, next) {
        const serviceType = req.query.featureproducts;
        let services = [];
        if (serviceType) {
            services = await serviceListRepo.sorttype(serviceType,8);
        }
        else {
            services = await serviceListRepo.getNumber(8);
        }
        if (!services) return next(createError(404));
        const { sort, ...withoutSort } = req.query;
        res.render('users/home',  { services, originalUrl: `${req.baseUrl}?${qs.stringify(withoutSort)}`});
    }
}

module.exports = new ServiceListController;