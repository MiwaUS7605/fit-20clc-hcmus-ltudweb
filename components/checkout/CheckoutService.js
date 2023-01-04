const db = require('../../db');
const checkoutRepository = require('./CheckoutRespository');

class CheckoutService {
   
    async getLatestOrder(idcustomer) {
        return checkoutRepository.getlatestorder(idcustomer);
    }

    async placeOrder(services, checkoutForm) {
        return checkoutRepository.placeorder(services, checkoutForm);
    }
}

module.exports = new CheckoutService;