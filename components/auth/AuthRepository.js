const db = require('../../db');
const bcrypt = require('bcryptjs');

class AuthRepository {
    async emailExists(email) {
        const result = await db.connection.execute('select email from customer where email = ? limit 1', [email]);
        return result[0].length > 0;
    }

    async getUserByEmail(email) {
        const result = await db.connection.execute('select * from customer where email = ? limit 1', [email]);
        return result[0] && result[0][0];
    }

    async insertUser(name, phonenumber, address, email, password) {
        await db.connection.execute('insert into `customer` (`name`, `phonenumber`,`address`,`email`,`password`)\
                                    values (?,?,?,?,?)', [name,phonenumber,address,email,password]);
    }

    async edit(nname, nphonenumber, naddress, npassword, user) {
        console.log("Tui dang edit");
        await db.connection.execute('update `customer` set `name` = ?, `phonenumber` = ?, `address` = ?, `password` = ?\
                                    where `email` = ?', [nname,nphonenumber,naddress,npassword, user.email]);
    }

}

module.exports = new AuthRepository;