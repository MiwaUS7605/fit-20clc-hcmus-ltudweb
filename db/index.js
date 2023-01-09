//get the client
const mysql = require('mysql2/promise');
require('dotenv').config();
const db = {connection: null};

async function db_connect() {
  db.connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })

  console.log("Connected\n");
}

db_connect();

module.exports = db;