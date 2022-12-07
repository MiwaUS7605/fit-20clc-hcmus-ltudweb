const db = require('../../db');

class LaundryService {
    async getAll() {
        let query_str = "select * from service";
        const result = await db.connection.execute(query_str);
        return result[0];
    }
    async getNumber(number) {
        let query_str = "select * from service limit ?";
        const result = await db.connection.execute(query_str,[`${number}`]);
        return result[0];
    }

    async search(name) {
        //Using prepare statement to avoid SQL injection 
        let query_str = "select * from service where servicename like ?";
        const result = await db.connection.execute(query_str, [`%${name}%`]);
        return result[0];
    }

    async get(id) {
        //Using prepare statement to avoid SQL injection
        let query_str = "select *\
                        from `service` as sv join `type` as ty on sv.idtype = ty.idtype\
                        where sv.idservice = ?";
        const result = await db.connection.execute(query_str, [id]);
        return result[0][0];
    }

    async sorttype(idtype) {
        //Using prepare statement to avoid SQL injection
        let query_str = 'select * from service '+
                        'where idtype like ? '+
                        'order by rating desc '+
                        'limit 8';
        const result = await db.connection.execute(query_str, [`%${idtype}%`]);
        return result[0];
    }
    async filter(name, idtype, min, max,sorttype) {
        console.log(sorttype);
        {
            name = name ? name : '';
            min = min ? min : 0;
            max = max ? max : 50000;
            idtype = idtype ? idtype : '%';
        }
        let query_str = "select * from `service` as sv\
                        where sv.servicename like ?\
                        and sv.idtype like ?\
                        and sv.price between ? and ?\
                        order by ?";
        const result = await db.connection.execute(query_str, [`%${name}%`,idtype,min,max,`%${sorttype}%`]);
        return result[0];
    }

    // async sortList(services,sortFilter) {
    //     let query_str = 'select * from ?\
    //                     order by ?';
                        
    //     const result = await db.connection.execute(query_str, [`%${services}%`,`%${sortFilter}%`]);
    //     return result[0];
    // }

    
}

module.exports = new LaundryService;
