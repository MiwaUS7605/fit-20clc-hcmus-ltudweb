//get the client
const mysql = require('mysql2/promise');

const db = {connection: null};

async function db_connect() {
  db.connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_laundry'
  })

  console.log("Connected\n");
}

db_connect();

module.exports = db;