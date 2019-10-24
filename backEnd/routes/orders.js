'use strict';

const db = require('./../connection'); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();
const tokenControl = require('./../middlewares/token_control'); // tokenControl middleware
const jwt = require('jsonwebtoken');

router.post('/', tokenControl, (req,res) => {
    res.setHeader('Content-Type','application/json');
    
    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);

    // find current user user id based on email inside decoded token
    db.query(`SELECT id FROM users WHERE email = '${decodedToken.email}';`).
    then(response => console.log(response[0][0].id)).
    catch(error => console.log(error))
});

module.exports = router;
