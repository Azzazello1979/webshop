'use strict';

const db = require('./../connection'); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const hash = require('sha256');
require('dotenv').config();
const salt = process.env.SALT;
const secret = process.env.SECRET;

router.post('/', (req, res) => {
  res.setHeader('Content-Type','application/json');
  db.query(`SELECT * FROM users WHERE email = '${req.body.email}';`)
  .then((rows) => { // will return array with 2 elements, the first element is the array of records, the second element is an array off additional info due to using promises
    if(rows[0].length > 0){
      console.log('This email is already registered. Please choose another.');
      return res.status(400).json({'message':'This email is already registered. Please choose another.'});
    } else {
      db.query(`INSERT INTO users (email, password) VALUES ('${req.body.email}', '${hash(req.body.password + salt)}') ;`)
      .then((OKpacket) => {
        console.log('OK, new user registerd');
        console.table(OKpacket); // visualize OKpacket fields
        let token = jwt.sign( { 'email': req.body.email }, secret, { 'expiresIn': '1d' } );
        res.status(200).json({ 'token': token });
      })
      .catch((e) => {
        console.log(e.message);
        return res.status(500).json({'message':'database error @ register > insert into'});
      })
    }
  })
  .catch((e) => {
    console.log(e.message);
    return res.status(500).json({'message':'database error @ register > select'});
  })
  
});






























/* router.post('/', (req, res) => {
  res.setHeader('Content-Type','application/json');
  db.query(`SELECT * FROM users WHERE email = '${req.body.email}';`, (err, rows) => {
    if (err){
      console.log(err);
      return res.status(500).json({'message': 'database error @ register > select'});
    } else if (rows.length > 0){
      res.status(400).json({'message': 'this email is already registered, please use a different email'});
    } else {
      db.query(`INSERT INTO users (email, password) VALUES ('${req.body.email}', '${hash(req.body.password + salt)}') ;`, (err, OKpacket) => {
        if (err){
          console.log(err);
          return res.status(500).json({'message':'database error @ register > insert into'});
        } else {
          console.log('OK, new user registerd ' + OKpacket);

          let token = jwt.sign( { 'email': req.body.email }, secret, { 'expiresIn': '1d' } );
          res.status(200).json({ 'token': token });
        }
      })
    }
  })
  
}); */

module.exports = router;
