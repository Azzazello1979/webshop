const db = require('./../connection'); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const hash = require('sha256');
const salt = process.env.SALT;
const secret = process.env.SECRET;

router.post('/', (req,res) => {

  res.setHeader('Content-Type','application/json');

  if(!req.body.password || !req.body.email || !req.body.password && !req.body.email){
    console.log('Both email and password is needed.');
    return res.status(400).json({'message':'Both email and password is needed.'});
  } else {
    db.query(`SELECT * FROM users WHERE email = '${req.body.email}';`)
    .then(response => {
      if(response[0].length === 0){
        return res.status(400).json({'message':'This email address is not registered.'});
      } else { // record with this emai exists, and there is password too

        let userId = response[0][0].id;

        let suppliedHashedPassword = hash(req.body.password + salt);
        let storedHashedPasswordForThisEmail = response[0][0].password;

        if(suppliedHashedPassword === storedHashedPasswordForThisEmail){

          let token = jwt.sign( { 'id': userId, 'email': req.body.email }, secret, { expiresIn: '3h' });
          res.status(200).json({'token': token});
        } else {
          console.log('Supplied password does not match with the one in our database.');
          return res.status(400).json({'message':'Supplied password does not match with the one in our database.'});
        }

      }
    }, rejection => console.log('SELECT * FROM users rejection: ', rejection))
    .catch((e) => {
      console.log(e.message);
      return res.status(500).json({'message':'DB Error @ select > user!'});
    })
  }
})

module.exports = router;
