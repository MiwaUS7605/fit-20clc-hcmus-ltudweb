const db = require('../../db');

class ServiceListRepository {
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
        let query_str = "select * from `service` as sv join `type` as ty on sv.idtype = ty.idtype\
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
    async filter(name, sorttype) {
        {
            name = name ? name : '';
            sorttype = (sorttype==0) ? sorttype : 1;
        }
        console.log("sort type"+sorttype);
        let query_str;
        switch (sorttype) {
            case '1':
                query_str = "select * from `service` as sv\
                                where sv.servicename like ?\
                                order by sv.idservice desc";
                break;
            case '2':
                query_str = "select * from `service` as sv\
                                where sv.servicename like ?\
                                order by sv.price asc";
                break;
            case '3':
                query_str = "select * from `service` as sv\
                                where sv.servicename like ?\
                                order by sv.price desc";
                break;
            case '4':
                query_str = "select * from `service` as sv\
                                    where sv.servicename like ?\
                                    order by sv.totalpurchase desc";
                break;
            default:
                query_str= "select * from `service` as sv\
                        where sv.servicename like ?";
                        
                break;
        }
        const result = await db.connection.execute(query_str, [`%${name}%`]);
        return result[0];
    }


    async createService(name,price,type,imageLink,description){
        console.log("hehehehe");
        await db.connection.execute('insert into `service` (`servicename`, `price`,`idtype`,`image`,`description`)\
                                    values (?,?,?,?,?)', [name,price,type,imageLink,description]);
    }

    async insertImage(img_link,maxID){
        console.log("hehehehe");
        await db.connection.execute('insert into `image` (`idservice`, `image`)\
                                    values (?,?)', [maxID,img_link]);
    }

    async getMaxID(){
        console.log("baby");
        const result=await db.connection.execute('select * from `service` as sv\
                                     order by sv.idservice desc\
                                     limit 1');
        return result[0][0];
    }

    async deleteService(id){
        await db.connection.execute('delete from `service` where idservice =?', [id]);

    }
}

module.exports = new ServiceListRepository;