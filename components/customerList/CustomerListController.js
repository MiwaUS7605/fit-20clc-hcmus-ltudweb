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
        const items_per_page = 6;
        const range_paginate = 4;
        var paginator = new Paginator(items_per_page,range_paginate);
        var pagination_info = paginator.build(countResult, currentPage); 
    
        res.render('admin/customer-list', {layout: 'admin-layout', accounts, 
                                        originalUrl: `${req.baseUrl}/customer-list?${qs.stringify(withoutSort)}`, 
                                        countResult, 
                                        pagination_info, 
                                        items_per_page});
    }
}

module.exports = new CustomerListController;