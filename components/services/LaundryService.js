const db = require('../../db');

class LaundryService {
    async getAll() {
        let query_str = "select * from service";
        const result = await db.connection.execute(query_str);
        return result[0];
    }
    async getNumber(number) {
        let query_str = "select * from service limit ?";
        const result = await db.connection.execute(query_str, [`${number}`]);
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

    async sorttype(idtype, number) {
        //Using prepare statement to avoid SQL injection
        let query_str = 'select * from service ' +
            'where idtype like ? ' +
            'order by rating desc ' +
            'limit ?';
        const result = await db.connection.execute(query_str, [`%${idtype}%`, `${number}`]);
        return result[0];
    }
    async filter(name, idtype, min, max, sorttype) {
        {
            name = name ? name : '';
            min = min ? min : 0;
            max = max ? max : 50000;
            idtype = idtype ? idtype : '%';
            sorttype = sorttype ? sorttype : 1;
        }
        let query_str = "select * from `service` as sv\
                        where sv.servicename like ?\
                        and sv.idtype like ?\
                        and sv.price between ? and ?";
        switch (sorttype) {
            case '1':
                query_str = "select * from `service` as sv\
                                where sv.servicename like ?\
                                and sv.idtype like ?\
                                and sv.price between ? and ?\
                                order by sv.price asc";
                break;
            case '2':
                query_str = "select * from `service` as sv\
                                where sv.servicename like ?\
                                and sv.idtype like ?\
                                and sv.price between ? and ?\
                                order by sv.price desc";
                break;
            case '3':
                query_str = "select * from `service` as sv\
                                    where sv.servicename like ?\
                                    and sv.idtype like ?\
                                    and sv.price between ? and ?\
                                    order by sv.rating desc";
                break;
            case '4':
                query_str = "select * from `service` as sv\
                                    where sv.servicename like ?\
                                    and sv.idtype like ?\
                                    and sv.price between ? and ?\
                                    order by sv.idservice desc";
                break;
        }
        const result = await db.connection.execute(query_str, [`%${name}%`, idtype, min, max]);
        return result[0];
    }

    async rating(rate, message, idservice, idcustomer) {
        await db.connection.execute('insert into `rating`(rate,message,idservice,idcustomer)\
                                    values (?,?,?,?)', [rate, message, idservice, idcustomer]);
    }

    async getrating(idservice){
        let query_str = "";
        query_str = 'select * from `rating` where `idservice` = ?';

        const result = await db.connection.execute(query_str, [idservice]);

        console.log(result[0]);
        return result[0];
    }

    async getService(id) {
        console.log("ID: "+id);
        let query_str = "select * \
                         from `service` \
                         where idservice =?";
        console.log("herrrrrrr");
        const result = await db.connection.execute(query_str, [id]);
        return result[0][0];           
    }

    async getImagelist(id) {
        try
        {
            console.log("ID: "+id);
            let query_str = "select * \
                            from `image` \
                            where idservice = ?";
            console.log("himmmm");
            const result = await db.connection.execute(query_str, [id]);
            console.log("resukt"+ result[0]);
            return result[0];
        }
        catch(e){
            //console.log(e);
        }           
    }
}

module.exports = new LaundryService;