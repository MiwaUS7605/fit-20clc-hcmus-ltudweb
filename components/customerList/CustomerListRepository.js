const db = require('../../db');

class CustomerListRepository {
    async getAll() {
        let query_str = "select * from customer";
        const result = await db.connection.execute(query_str);
        return result[0];
    }
    // async getNumber(number) {
    //     let query_str = "select * from service limit ?";
    //     const result = await db.connection.execute(query_str, [`${number}`]);
    //     return result[0];
    // }

    async search(name) {
        //Using prepare statement to avoid SQL injection 
        let query_str = "select * from customer where name like ?";
        const result = await db.connection.execute(query_str, [`%${name}%`]);
        return result[0];
    }

    // async get(id) {
    //     //Using prepare statement to avoid SQL injection
    //     let query_str = "select *\
    //                     from `service` as sv join `type` as ty on sv.idtype = ty.idtype\
    //                     where sv.idservice = ?";
    //     const result = await db.connection.execute(query_str, [id]);
    //     return result[0][0];
    // }

    async sorttype(idtype, number) {
        //Using prepare statement to avoid SQL injection
        let query_str = 'select * from customer ' +
            'where idtype like ? ' +
            'order by rating desc ' +
            'limit ?';
        const result = await db.connection.execute(query_str, [`%${idtype}%`, `${number}`]);
        return result[0];
    }
    async filter(name,sorttype) {
        {
            name = name ? name : '';
            sorttype = sorttype ? sorttype : 0;
        }
        let query_str;
        switch (sorttype) {
            case '1'://A-Z name
                query_str = "select * from `customer` \
                                where name like ?\
                                order by name asc";
                break;
            case '2': //Z-A name
                query_str = "select * from `customer` \
                                where name like ?\
                                order by name desc";
                break;
            case '3'://A-Z email
            query_str = "select * from `customer` \
                            where name like ?\
                            order by email asc";
            break;
            case '4': //Z-A email
                query_str = "select * from `customer` \
                                where name like ?\
                                order by email desc";
                break;
            case '5': //registration time
                query_str = "select * from `customer` \
                                where name like ?\
                                order by idcustomer desc";
                break;
            default:
                query_str = "select * from `customer`\
                        where name like ?";
                break;
        }
        const result = await db.connection.execute(query_str, [`%${name}%`]);
        return result[0];
    }
}

module.exports = new CustomerListRepository;