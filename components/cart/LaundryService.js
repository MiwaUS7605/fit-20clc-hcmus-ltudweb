const db = require('../../db');
const authService = require('../auth/AuthService');

class LaundryService {
    async get(id) {
        //Using prepare statement to avoid SQL injection
        let query_str = "select * from `service` where idservice = ?";
        const result = await db.connection.execute(query_str, [id]);
        return result[0][0];
    }

    // async checkcart(idcustomer, idservice) {
    //     let query_str = "select * from `cart` as c left join service as sv on c.idservice = sv.idservice\
    //                 where c.idcustomer = ?, c.idservice = ?";
    //     const result = await db.connection.execute(query_str, [idcustomer, idservice]);
    //     return result[0];
    // }

    async addtocart(idcustomer, idservice) {
        await db.connection.execute('insert into `cart` (idcustomer, idservice)\
                                        values (?,?)', [idcustomer, idservice]);
    }

    async removefromcart(idcustomer, idservice) {
        await db.connection.execute('delete from `cart` where idcustomer = ? and idservice = ?', [idcustomer, idservice]);
        console.log('Im deleting this');
    }

    async getcart(userId) {
        //Using prepare statement to avoid SQL injection
        let query_str = "select * from `cart` as c left join service as sv on c.idservice = sv.idservice\
                     where idcustomer = ?";
        const result = await db.connection.execute(query_str, [userId]);
        return result[0];
    }

    async incrQuantity(idcustomer, idservice) {
        let query_str = "update `cart`\
                        set number = number + 1\
                        where idcustomer = ? and idservice = ?";
        await db.connection.execute(query_str, [idcustomer, idservice]);
    }

    async descQuantity(idcustomer, idservice) {
        let query_str = "update `cart`\
                        set number = number - 1\
                        where idcustomer = ? and idservice = ?";
                        
        await db.connection.execute(query_str, [idcustomer, idservice]);
    }

    async getSubtotal(services) {
        var sub_total = 0;
        for (var service of services) {
            sub_total += service['number']*service['price'];
        }
        return sub_total;
    }
}

module.exports = new LaundryService;