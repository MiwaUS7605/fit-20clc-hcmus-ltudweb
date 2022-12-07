//get the client
const mysql = require('mysql2/promise');

const db = {connection: null};

async function db_connect() {
  db.connection = await mysql.createConnection({
    host: 'db4free.net',
    user: 'sunflowerltudweb',
    password: 'tamsotam',
    database: 'db_laundry'
  })

  console.log("Connected\n");
}

db_connect();

module.exports = db;