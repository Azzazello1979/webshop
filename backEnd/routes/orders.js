"use strict";

const db = require("./../connection"); // This connection uses mysql-promise
const express = require("express");
const router = express.Router();
const tokenControl = require("./../middlewares/token_control"); // tokenControl middleware
const jwt = require("jsonwebtoken");

router.post("/", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let currentUserID;
  let orderID;

  let validatedZIP;
  let validatedPOBOX;

  let validated_b_ZIP;
  let validated_b_POBOX;

  // implement more validation errors, like whitespace in input field, etc...

const { // destructuring ... picking all these properties from 'req.body.'
  shippingAddress, 
  billingAddress, 
  paymentOption, 
  shippingOption, 
  shippingAddress, 
  billingAddress,
  products
   } = req.body;

  shippingAddress.ZIP === undefined
    ? (validatedZIP = 0)
    : (validatedZIP = shippingAddress.ZIP);

  shippingAddress.POBOX === undefined
    ? (validatedPOBOX = 0)
    : (validatedPOBOX = shippingAddress.POBOX);

  if (billingAddress) {
    billingAddress.ZIP === undefined
      ? (validated_b_ZIP = 0)
      : (validated_b_ZIP = billingAddress.ZIP);

    billingAddress.POBOX === undefined
      ? (validated_b_POBOX = 0)
      : (validated_b_POBOX = billingAddress.POBOX);
  }

  let decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
  currentUserID = decodedToken.id;


    // insert record(s) into suborder table
    db.query( `INSERT INTO orders (user_id, payment_id, shipping_id, orderCreated) VALUES
    ( ${currentUserID}, ${paymentOption}, ${shippingOption}, now() );` )
    .then(response2 => {
      console.log("response after INSERT INTO orders: ", response2);

      orderID = response2[0].insertId; // orderID to be used in suborder table, address table and billing_address table

      products.forEach(e => {
        return db.query(`INSERT INTO suborder (order_id, product_id, amount) VALUES 
            ( ${orderID}, ${e.id}, ${e.amount} );`);
      });
    })
    // insert record into ADDRESS table
    .then(response3 => {
      console.log("response after INSERT INTO suborder: ", response3);
      return db.query(`INSERT INTO address (order_id, name, country, state, county, city, ZIP, POBOX, address1, address2, extra) VALUES 
        ( ${orderID}, '${shippingAddress.name}', '${shippingAddress.country}', '${shippingAddress.state}', 
        '${shippingAddress.county}', '${shippingAddress.city}', ${validatedZIP}, 
        ${validatedPOBOX}, '${shippingAddress.address1}', '${shippingAddress.address2}', 
        '${shippingAddress.extra}' );`);
    })
    // if req.body.billingAddress is truthy, add billingAddress info to BILLING_ADDRESS
    .then(response4 => {
      console.log("response after INSERT INTO address: ", response4);
      if (billingAddress) {
        return db.query(`INSERT INTO billing_address (order_id, name, country, state, county, city, ZIP, POBOX, address1, address2) VALUES 
        ( ${orderID}, '${billingAddress.name}', '${billingAddress.country}', '${billingAddress.state}', 
        '${billingAddress.county}', '${billingAddress.city}', ${validated_b_ZIP}, 
        ${validated_b_POBOX}, '${billingAddress.address1}', '${billingAddress.address2}' );`);
      }
    })
    .then(response5 => {
      console.log(
        "response after INSERT INTO billing_address (undefined means: billing address was not provided): ",
        response5
      );
      return res.status(200).json({
        message: `OK, order saved to database for email ${decodedToken.email}`
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message:
          "Something went wrong at /order endpoint, check console message!"
      });
    });
});

module.exports = router;
