const laundryService = require('./LaundryService');
const createError = require('http-errors');
const qs = require('qs');

class ServiceController {
    async list(req, res, next) {
        const nameFilter = req.query.search;
        let services = [];
        if (nameFilter) {
            services = await laundryService.search(nameFilter);
        }
        else {
            services = await laundryService.getAll();
        }
        const { sort, ...withoutSort } = req.query;
        res.render('users/shop-grid', { services, originalUrl: `${req.baseUrl}?${qs.stringify(withoutSort)}`});
    }

    async details(req, res, next) {
        const serviceId = req.params['serviceId'];
        const service = await laundryService.get(serviceId);
        if (!service) return next(createError(404));
        res.render('users/shop-details', {service});
    }
}

module.exports = new ServiceController;