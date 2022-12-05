const db = require('../../db');

class LaundryService {
    async getAll() {
        let query_str = "select * from service";
        const result = await db.connection.execute(query_str);
        return result[0];
    }

    async filter(name) {
        //Using prepare statement to avoid SQL injection 
        let query_str = "select * from service where servicename like ?";
        const result = await db.connection.execute(query_str, [`%${name}%`]);
        return result[0];
    }

    async get(id) {
        //Using prepare statement to avoid SQL injection
        let query_str = "select * from service where idservice = ?";
        const result = await db.connection.execute(query_str, [id]);
        return result[0][0];
    }
}

module.exports = new LaundryService;