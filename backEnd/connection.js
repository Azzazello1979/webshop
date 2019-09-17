'use strict';

const db = require('mysql-promise')(); // mysql-promise package
require('dotenv').config();

db.configure({
  host: process.env.DB_host,
  user: process.env.DB_user,
  password: process.env.DB_pass,
  database: process.env.DB_database
});

module.exports = db;
