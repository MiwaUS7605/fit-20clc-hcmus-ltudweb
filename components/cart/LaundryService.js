const db = require('../../db');
const authService = require('../auth/AuthService');

class LaundryService {
    async get(id) {
        //Using prepare statement to avoid SQL injection
        let query_str = "select *\
                        from `service` as sv join `type` as ty on sv.idtype = ty.idtype\
                        where sv.idservice = ?";
        const result = await db.connection.execute(query_str, [id]);
        return result[0][0];
    }

    async addtocart(idcustomer, idservice) {
        await db.connection.execute('insert into `cart` (idcustomer, idservice)\
                                        values (?,?)', [idcustomer, idservice]);
    }

    async getcart(userId) {
        //Using prepare statement to avoid SQL injection
        let query_str = "select * from `cart` where idcustomer = ?";
        const result = await db.connection.execute(query_str, [userId]);
        return result[0][0];
    }
}

module.exports = new LaundryService;