'use strict';

const db = require('./../connection'); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenControl = require('./../middlewares/token_control'); // tokenControl middleware

router.post('/', tokenControl, (req,res) => {
    res.setHeader('Content-Type','application/json');
    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    let currentUserID;

    // FIND CURRENT USER user id based on email inside decoded token
    db.query(`SELECT id FROM users WHERE email = '${decodedToken.email}';`).
        then((response1) => {
            currentUserID = response1[0][0].id;
        }).
        then(() => { // callback parameter empty because previous op. in chain is not async
            req.body.forEach(e => {
                return db.query(`INSERT INTO wish (user_id, product_id) VALUES(
                    ${currentUserID}, ${e.id}
                );`)
            });
            res.status(200).json({'message':'@wish endpoint: OK, wish list saved to DB.'});
        }).
        catch(error => {
            console.log(error);
            res.status(500).json({'message':'@wish endpoint: error when saving wish items to database'});
        })





})

module.exports = router;
