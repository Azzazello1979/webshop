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

    req.body.shippingAddress.ZIP === '' || req.body.shippingAddress.ZIP === undefined ? validatedZIP = 0 : validatedZIP = req.body.shippingAddress.ZIP ;
    req.body.shippingAddress.POBOX === '' || req.body.shippingAddress.POBOX === undefined ? validatedPOBOX = 0 : validatedPOBOX = req.body.shippingAddress.POBOX ;

    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);

    // FIND CURRENT USER user id based on email inside decoded token
    db.query(`SELECT id FROM users WHERE email = '${decodedToken.email}';`).
    then( (response1) => {
        console.log('response after SELECT from users: ', response1)
        currentUserID = response1[0][0].id;
    }).


    // insert a record into ORDERS table, callback parameter empty because previous op. in chain is not async
    then(() => {
        return db.query(
            `INSERT INTO orders (user_id, payment_id, shipping_id, orderCreated) VALUES
            ( ${currentUserID}, ${req.body.paymentOption}, ${req.body.shippingOption}, now() );`
            )
    }).


    // insert record into suborder table    
    then( (response2) => {
        console.log('response after INSERT INTO order: ', response2)
        return db.query(
            `INSERT INTO suborder (order_id, product_id, amount) VALUES 
        ( ${response2[0].insertId}, ${req.body.products[0].id}, ${req.body.products[0].amount} );`
        )
    }).


    // insert record into ADDRESS table
    then( (response3) => {
        console.log('response after INSERT INTO suborder: ', response3)
        return db.query(`INSERT INTO address (user_id, country, state, county, city, ZIP, POBOX, address1, address2, extra) VALUES 
        ( ${currentUserID}, '${req.body.shippingAddress.country}', '${req.body.shippingAddress.state}', 
        '${req.body.shippingAddress.county}', '${req.body.shippingAddress.city}', ${validatedZIP}, 
        ${validatedPOBOX}, '${req.body.shippingAddress.address1}', '${req.body.shippingAddress.address2}', 
        '${req.body.shippingAddress.extra}' );`)
    }).


    // if req.body.billingAddress is truthy, add billingAddress info to BILLING_ADDRESS
    then( (response4) => {
        console.log('response after INSERT INTO address: ', response4)
        if(req.body.billingAddress)

        return db.query(`INSERT INTO billing_address (user_id, country, state, county, city, ZIP, POBOX, address1, address2) VALUES 
        ( ${currentUserID}, '${req.body.billingAddress.country}', '${req.body.billingAddress.state}', 
        '${req.body.billingAddress.county}', '${req.body.billingAddress.city}', ${validatedZIP}, 
        ${validatedPOBOX}, '${req.body.billingAddress.address1}', '${req.body.billingAddress.address2}' );`)
        

        
    }).


    then( (response5) => {
        console.log('response after INSERT INTO billing_address (or null if billing address was not provided): ', response5)
        return res.status(200).json({message: `OK, order saved to database for email ${decodedToken.email}`})
    }).


    catch(error => {
        console.log(error);
    })
});

module.exports = router;
