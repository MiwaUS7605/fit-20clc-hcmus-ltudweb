const db = require('../../db');

class Authentication{
    async getAll() {
        let query_str = "select * from customer";
        const result = await db.connection.execute(query_str);
        return result[0];
    }
    async search(email) {
        //Using prepare statement to avoid SQL injection 
        let query_str = "select * from customer where email like ?";
        const result = await db.connection.execute(query_str, [`%${email}%`]);
        return result[0];
    }
    async getPassword(email) {
        let query_str = "select password from customer where email like ?";
        const result = await db.connection.execute(query_str, [`${email}`]);
        return result[0];
    }
}