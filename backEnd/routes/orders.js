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
  req.body.shippingAddress.ZIP === undefined
    ? (validatedZIP = 0)
    : (validatedZIP = req.body.shippingAddress.ZIP);

  req.body.shippingAddress.POBOX === undefined
    ? (validatedPOBOX = 0)
    : (validatedPOBOX = req.body.shippingAddress.POBOX);

  if (req.body.billingAddress) {
    req.body.billingAddress.ZIP === undefined
      ? (validated_b_ZIP = 0)
      : (validated_b_ZIP = req.body.billingAddress.ZIP);

    req.body.billingAddress.POBOX === undefined
      ? (validated_b_POBOX = 0)
      : (validated_b_POBOX = req.body.billingAddress.POBOX);
  }

  let decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
  currentUserID = decodedToken.id;

  db.query(
    `INSERT INTO orders (user_id, payment_id, shipping_id, orderCreated) VALUES
            ( ${currentUserID}, ${req.body.paymentOption}, ${req.body.shippingOption}, now() );`
  )

    // insert record(s) into suborder table
    .then(response2 => {
      console.log("response after INSERT INTO orders: ", response2);

      orderID = response2[0].insertId; // orderID to be used in suborder table, address table and billing_address table

      req.body.products.forEach(e => {
        return db.query(`INSERT INTO suborder (order_id, product_id, amount, price) VALUES 
            ( ${orderID}, ${e.id}, ${e.amount}, ${e.price} );`);
      });
    })
    // insert record into ADDRESS table
    .then(response3 => {
      console.log("response after INSERT INTO suborder: ", response3);
      return db.query(`INSERT INTO address (order_id, name, country, state, county, city, ZIP, POBOX, address1, address2, extra) VALUES 
        ( ${orderID}, '${req.body.shippingAddress.name}', '${req.body.shippingAddress.country}', '${req.body.shippingAddress.state}', 
        '${req.body.shippingAddress.county}', '${req.body.shippingAddress.city}', ${validatedZIP}, 
        ${validatedPOBOX}, '${req.body.shippingAddress.address1}', '${req.body.shippingAddress.address2}', 
        '${req.body.shippingAddress.extra}' );`);
    })
    // if req.body.billingAddress is truthy, add billingAddress info to BILLING_ADDRESS
    .then(response4 => {
      console.log("response after INSERT INTO address: ", response4);
      if (req.body.billingAddress) {
        return db.query(`INSERT INTO billing_address (order_id, name, country, state, county, city, ZIP, POBOX, address1, address2) VALUES 
        ( ${orderID}, '${req.body.billingAddress.name}', '${req.body.billingAddress.country}', '${req.body.billingAddress.state}', 
        '${req.body.billingAddress.county}', '${req.body.billingAddress.city}', ${validated_b_ZIP}, 
        ${validated_b_POBOX}, '${req.body.billingAddress.address1}', '${req.body.billingAddress.address2}' );`);
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

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
  let currentUserID = decodedToken.id;

});

module.exports = router;
