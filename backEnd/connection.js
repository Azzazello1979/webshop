'use strict';

const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({

  host: process.env.DB_host,
  user: process.env.DB_user,
  password: process.env.DB_pass,
  database: process.env.DB_database

});

db.connect((err) => {
  if (err) {
    return console.log('Error connecting to DB');
  }
  console.log('OK...MySQL connection established');
});

module.exports = db;
