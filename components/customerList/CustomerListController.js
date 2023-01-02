const customerListRepo = require('./CustomerListRepository');
const createError = require('http-errors');
const qs = require('qs');
const Paginator = require('paginator');

class CustomerListController {    
    async list(req, res, next) {
        const { search: nameFilter,
            sort: sortFilter,
            page: currentPage} = req.query;

        let accounts = [];

        if (nameFilter ||sortFilter) {
            accounts = await customerListRepo.filter(nameFilter,sortFilter);
        }
        else {
            accounts = await customerListRepo.getAll();
        }
        const { page, ...withoutSort } = req.query;
        //Render services results
        const countResult = Object.keys(accounts).length;
        //Paginate results
        const items_per_page = 2;
        const range_paginate = 4;
        var paginator = new Paginator(items_per_page,range_paginate);
        var pagination_info = paginator.build(countResult, currentPage); 
        //accounts = await customerListRepo.getAll();
        res.render('admin/customer-list', {layout: 'admin-layout', accounts, 
                                        originalUrl: `${req.baseUrl}/customer-list?${qs.stringify(withoutSort)}`, 
                                        countResult, 
                                        pagination_info, 
                                        items_per_page});
        // res.render('admin/customer-list',{layout: 'admin-layout',accounts});
    }

//     async details(req, res, next) {
//         const serviceId = req.params['serviceId'];
//         const service = await customerListRepo.get(serviceId);
//         if (!service) return next(createError(404));

//         const type = service.idtype;
//         let products = [];
//         if (type) {
//             products = await customerListRepo.sorttype(type,4);
//         }
//         else {
//             products = await customerListRepo.getNumber(4);
//         }
//         if (!products) return next(createError(404));
//         res.render('users/shop-details', { service,products});
//     }

//     async featuredproducts(req, res, next) {
//         const serviceType = req.query.featureproducts;
//         let services = [];
//         if (serviceType) {
//             services = await customerListRepo.sorttype(serviceType,8);
//         }
//         else {
//             services = await customerListRepo.getNumber(8);
//         }
//         if (!services) return next(createError(404));
//         const { sort, ...withoutSort } = req.query;
//         res.render('users/home',  { services, originalUrl: `${req.baseUrl}?${qs.stringify(withoutSort)}`});
//     }
}

module.exports = new CustomerListController;