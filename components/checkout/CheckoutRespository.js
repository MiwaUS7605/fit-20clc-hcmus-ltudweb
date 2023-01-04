const db = require('../../db');
const laundryService = require('../cart/LaundryService');

class CheckoutRespository {
    async getlatestorder(userId) {
        let query_str = "select o.idorder, o.idcustomer, o.address, o.phonenumber, od.idservice, s.servicename, od.`number`, s.price\
                        from `order` as o\
                        join `orderdetail` as od on o.idorder = od.idorder\
                        join `service` as s on s.idservice = od.idservice\
                        where o.idcustomer = ? and o.idorder = (select max(o2.idorder)\
                                                                from `order` as o2\
                                                                where o2.idcustomer = o.idcustomer)";
        const result = await db.connection.execute(query_str, [userId]);
        return result[0];
    }

    async getLatestOrder(userId) {
        let query_str = "select * from `order` as o1\
                            where o1.idorder = (select max(o2.idorder) from `order` as o2\
                                                where o1.idcustomer= ? and o2.idcustomer = o1.idcustomer)";
        const result = await db.connection.execute(query_str, [userId]);
        return result[0];
    }

    async placeorder(cart, checkoutForm) {
        await this.updateOrderTable(cart, checkoutForm);
        console.log(cart[0]['idcustomer']);

        var order = await this.getLatestOrder(cart[0]['idcustomer']);
        console.log(order);
        console.log(order['idorder']);
        for (var orderservice of cart) {
            await this.updateOrderDetailTable(order[0]['idorder'], orderservice);
            await this.updateTotalPurchases(orderservice['idservice'], orderservice['number']);
        }

        await this.cleanCurrentCart(cart);
    }

    //Each service has its own total purchase
    //for revenue purposes
    async updateTotalPurchases(idservice, number) {
        let query_str = "update `service` \
                        set totalpurchase = totalpurchase + ?\
                        where idservice = ?";
        await db.connection.execute(query_str, [number, idservice]);
    }

    async updateOrderTable(cart, checkoutForm) {
        var totalprice = await laundryService.getSubtotal(cart);
        console.log(totalprice);
        console.log(checkoutForm['address-1']);
        console.log(cart[0]['idcustomer']);

        let query_str = "insert into `order` (idcustomer, totalprice, address, phonenumber) \
                        values (?,?,?,?)";
        await db.connection.execute(query_str, [cart[0]['idcustomer'],
            totalprice,
            checkoutForm['address-1'],
            checkoutForm['phone-number']]);
    }

    async updateOrderDetailTable(idorder, service) {
        // for (var service of cart) {
        //     let query_str = "insert into `orderdetail` (idorder, idservice, number) \
        //                     values (?,?,?,?)";
        //     await db.connection.execute(query_str, [idorder, 
        //                                             service['idservice'],
        //                                             service['number']]);
        // }
        let query_str = "insert into `orderdetail` (idorder, idservice, number) \
                            values (?,?,?)";
        await db.connection.execute(query_str, [idorder,
            service['idservice'],
            service['number']]);
    }

    async cleanCurrentCart(cart) {
        for (var service of cart) {
            console.log(service);
            await laundryService.removefromcart(service['idcustomer'], service['idservice']);
        }
    }
}

module.exports = new CheckoutRespository;