'use strict';

const db = require('./../connection');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const hash = require('sha256');
require('dotenv').config();
const salt = process.env.SALT;
const secret = process.env.secret;

router.get('/', (req, res) => {
  res.status(200).send('register endpoint GET OK');
});

router.post('/', (req, res) => {
  
  db.query(`SELECT * FROM users WHERE email = '${req.body.email}';`, (err, rows) => {
    if (err){
      console.log(err);
      return res.status(500).json({'message':'database error @ register > select'});
    } else if (rows.length > 0){
      res.status(400).json({'message':'this email is already registered, please use a different email'});
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
  
});

module.exports = router;
