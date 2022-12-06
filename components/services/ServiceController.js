const laundryService = require('./LaundryService');
const createError = require('http-errors');
const qs = require('qs');

class ServiceController {
    async list(req, res, next) {
        const { search: nameFilter,
            category: categoryFilter,
            sort: sortFilter,
            from: minPrice,
            to: maxPrice } = req.query;
        let services = [];

        if (nameFilter || categoryFilter || minPrice || minPrice) {
            services = await laundryService.filter(nameFilter,categoryFilter,minPrice,maxPrice);
        }
        else {
            services = await laundryService.getAll();
        }
        const { sort, ...withoutSort } = req.query;

        //Render services results
        const countResult = Object.keys(services).length;
        res.render('users/shop-grid', { services, originalUrl: `${req.baseUrl}?${qs.stringify(withoutSort)}`, countResult});
    }

    async details(req, res, next) {
        const serviceId = req.params['serviceId'];
        const service = await laundryService.get(serviceId);
        if (!service) return next(createError(404));
        res.render('users/shop-details', { service });
    }
}

module.exports = new ServiceController;