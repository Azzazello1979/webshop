'use strict';

const db = require('./../connection'); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();
const tokenControl = require('./../middlewares/token_control'); // tokenControl middleware
const jwt = require('jsonwebtoken');

router.post('/', tokenControl, (req,res) => {
    res.setHeader('Content-Type','application/json');

    let currentUserID;
    let validatedZIP;
    let validatedPOBOX;

    req.body.shippingAddress.ZIP === '' ? validatedZIP = 0 : null ;
    req.body.shippingAddress.POBOX === '' ? validatedPOBOX = 0 : null ;


    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);

    // find current user user id based on email inside decoded token
    db.query(`SELECT id FROM users WHERE email = '${decodedToken.email}';`).
    then( response => {
        currentUserID = response[0][0].id;
    }).
    // insert a record into orders table
    then(
        db.query(`INSERT INTO orders (user_id, payment_id, shipping_id, orderCreated) VALUES
        ( ${currentUserID}, ${req.body.paymentOption}, ${req.body.shippingOption}, ${Date.now()} );`)
    ).
    // insert record into suborder table, use previous query's OKPacket 'insert_id' as 'order_id' in suborder record
    then( OKpacket => {
        console.log(OKpacket)
        db.query(`INSERT INTO suborder (product_id, amount) VALUES 
        ( ${req.body.products[0].id}, ${req.body.products[0].amount} );`)
    }).
    // insert record into address table
    then(
        db.query(`INSERT INTO address (user_id, country, state, county, city, ZIP, POBOX, address1, address2, extra) VALUES 
        ( ${currentUserID}, '${req.body.shippingAddress.country}', '${req.body.shippingAddress.state}', 
        '${req.body.shippingAddress.county}', '${req.body.shippingAddress.city}', ${validatedZIP}, 
        ${validatedPOBOX}, '${req.body.shippingAddress.address1}', '${req.body.shippingAddress.address2}', 
        '${req.body.shippingAddress.extra}' );`)
    ).
    // if req.body.billingAddress is truthy, add billingAddress info to billing_address
    then(

    ).
    catch(error => {
        console.log(error);
    })
});

module.exports = router;
