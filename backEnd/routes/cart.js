'use strict';

const db = require('./../connection'); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();
const tokenControl = require('./../middlewares/token_control'); // tokenControl middleware

router.post('/', tokenControl, (req,res) => {
    res.setHeader('Content-Type','application/json');

    let currentUserID;
    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);

    // FIND CURRENT USER user id based on email inside decoded token
        db.query(`SELECT id FROM users WHERE email = '${decodedToken.email}';`).
    then(response1 => {
        console.log('response after SELECT from users: ', response1)
        return currentUserID = response1[0][0].id;
    }).
    then(response2 => {
        console.log(response2)
        return db.query(`INSERT INTO cart (product_id, amount) VALUES ( ${req.body[0][0].id}, ${req.body[0][0].amount} );`)
    }).
    then(response3 => {
        console.log(response3)
        return db.query(`INSERT INTO wish (product_id) VALUES ( ${req.body[0][0].id} );`)
    }).
    catch(
        err => console.log(err),
        res.status(500).json({'message':'Error during saving cart items to db.'})
    )

})

module.exports = router;
