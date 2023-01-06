const orderListRepo = require('./OrderListRepository');
const createError = require('http-errors');
const qs = require('qs');
const Paginator = require('paginator');

class OrderListController {    
    async list(req, res, next) {
        const { filter: statusFilter,
            sort: sortFilter,
            page: currentPage} = req.query;

        let orders = [];

        if (statusFilter||sortFilter) {
            if (statusFilter==2){
                orders = await orderListRepo.sort(sortFilter);
            }
            else {
                orders = await orderListRepo.filter(statusFilter,sortFilter);
            }
        }
        else {
            orders = await orderListRepo.getAll();
        }
        const { page, ...withoutSort } = req.query;
        //Render orders results
        const countResult = Object.keys(orders).length;
        //Paginate results
        const items_per_page = 6;
        const range_paginate = 4;
        var paginator = new Paginator(items_per_page,range_paginate);
        var pagination_info = paginator.build(countResult, currentPage); 
        
        res.render('admin/order-history', {layout: 'admin-layout', orders, 
                                        originalUrl: `${req.baseUrl}/order-history?${qs.stringify(withoutSort)}`, 
                                        countResult, 
                                        pagination_info, 
                                        items_per_page});
    };
    async updatestatus(req, res, next) {
        const id = req.body.id;
        console.log(id);
        try{
            await orderListRepo.status(id);
            console.log(id);
        } catch(e){
            res.render('admin/order-history', { error: e.message });
            return;
        }
    }
}

module.exports = new OrderListController;