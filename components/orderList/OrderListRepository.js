const db = require('../../db');

class OrderListRepository {
    async getAll() {
        let query_str = "select * from `order` as o join `orderstatus` as os on o.status = os.idstatus";
        const result = await db.connection.execute(query_str);
        return result[0];
    }

    async sort(sorttype) {
        {
            sorttype = sorttype ? sorttype : 0;
        }
        let query_str = "select * from `order` as o join `orderstatus` as os on o.status = os.idstatus";

        switch (sorttype) {
            case '1'://oldest order
                query_str = "select * from `order` as o join `orderstatus` as os on o.status = os.idstatus\
                                        order by idcustomer asc";
                break;
            case '2': //latest order
                query_str = "select * from `order` as o join `orderstatus` as os on o.status = os.idstatus\
                                        order by idcustomer desc";
                break;
            default:
                break;
        }

        const result = await db.connection.execute(query_str);
        return result[0];
    }

    async filter(status, sorttype) {
        {
            status = status ? status : '';
            sorttype = sorttype ? sorttype : 0;
        }
        let query_str = "select * from `order` as o join `orderstatus` as os on o.status = os.idstatus";

        switch (sorttype) {
            case '1'://oldest order
                query_str = "select * from `order` as o join `orderstatus` as os on o.status = os.idstatus\
                                        where status = ? \
                                        order by idcustomer asc";
                break;
            case '2': //latest order
                query_str = "select * from `order` as o join `orderstatus` as os on o.status = os.idstatus\
                                        where status = ?\
                                        order by idcustomer desc";
                break;
            default:
                query_str = "select * from `order` as o join `orderstatus` as os on o.status = os.idstatus\
                                where status = ?";
                break;
        }

        const result = await db.connection.execute(query_str, [status]);
        return result[0];
    }
    async status(idorder) {
        let query_str;
        query_str = "update `order` set `status` = 1 where `idorder` =?";
        await db.connection.execute(query_str, [idorder]);
        console.log(idorder);
    }
}

module.exports = new OrderListRepository;