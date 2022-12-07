const laundryService = require('./LaundryService');
const createError = require('http-errors');
const qs = require('qs');

class ServiceController {
    async list(req, res, next) {
        let { search: nameFilter,
            category: categoryFilter,
            sort: sortFilter,
            from: minPrice,
            to: maxPrice } = req.query;
        
        if(sortFilter){
            switch(sortFilter){
                case '1':
                    sortFilter='sv.price asc';
                    break;
                case '2':
                    sortFilter='sv.price desc';
                    break;
                case '3':
                    sortFilter='sv.rating desc';
                    break;
                case '4':
                    sortFilter='sv.idservice desc';
                    break;
            }
        }
        let services = [];

        if (nameFilter || categoryFilter || minPrice || maxPrice||sortFilter) {
            services = await laundryService.filter(nameFilter,categoryFilter,minPrice,maxPrice,sortFilter);
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

        const type = service.idtype;
        if (!type) return next(createError(404));

        let products = [];
        if (type) {
            products = await laundryService.sorttype(type,4);
        }
        else {
            products = await laundryService.getNumber(4);
        }
        if (!products) return next(createError(404));
        
        res.render('users/shop-details', { service,products });

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
}

module.exports = new ServiceController;