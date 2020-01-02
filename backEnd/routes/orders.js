"use strict";

const db = require("./../connection"); // This connection uses mysql-promise
const express = require("express");
const router = express.Router();
const tokenControl = require("./../middlewares/token_control"); // tokenControl middleware
const jwt = require("jsonwebtoken");

router.post("/", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");

  console.log(req.body);

  let currentUserID;
  let orderID = 0;

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
    .then(
      response2 => {
      console.log("response after INSERT INTO orders: ", response2);

      orderID = response2[0]['insertId']; // orderID to be used in suborder table, address table and billing_address table
      //console.log('this is the type of orderId: ' + typeof orderID);

      let products = [...req.body.products];
      Promise.all([
        products.forEach(e => {
          //console.log(e);
          return db.query(`INSERT INTO suborder (order_id, product_id, amount, price) VALUES 
              ( ${orderID}, ${e.id}, ${e.amount}, ${e.price} );`);
        })
      ]).then(
        ok => {
          console.log('OK, all products inserted.' + ok);
          return ok;
        },
        fail => console.log('some inserts into suborder rejected: ' + fail)
        ).catch(err => console.log('Promise.all([]) error: ' + err))
        

    },
      rejection => {
        return console.log('INSERT INTO orders Rejection: ', rejection);
      }
    )
    // insert record into ADDRESS table
    .then(response3 => {
      console.log("response after INSERT INTO suborder: ", response3);
      return db.query(`INSERT INTO address (order_id, name, country, state, county, city, ZIP, POBOX, address1, address2, extra) VALUES 
        ( ${orderID}, '${req.body.shippingAddress.name}', '${req.body.shippingAddress.country}', '${req.body.shippingAddress.state}', 
        '${req.body.shippingAddress.county}', '${req.body.shippingAddress.city}', ${validatedZIP}, 
        ${validatedPOBOX}, '${req.body.shippingAddress.address1}', '${req.body.shippingAddress.address2}', 
        '${req.body.shippingAddress.extra}' );`);
    },
      rejection => {
        return console.log('INSERT INTO address Rejection: ', rejection);
      }
    )
    // if req.body.billingAddress is truthy, add billingAddress info to BILLING_ADDRESS
    .then(response4 => {
      console.log("response after INSERT INTO address: ", response4);
      if (req.body.billingAddress) {
        return db.query(`INSERT INTO billing_address (order_id, name, country, state, county, city, ZIP, POBOX, address1, address2) VALUES 
        ( ${orderID}, '${req.body.billingAddress.name}', '${req.body.billingAddress.country}', '${req.body.billingAddress.state}', 
        '${req.body.billingAddress.county}', '${req.body.billingAddress.city}', ${validated_b_ZIP}, 
        ${validated_b_POBOX}, '${req.body.billingAddress.address1}', '${req.body.billingAddress.address2}' );`);
      }
    },
      rejection => {
        console.log('INSERT INTO billing_address Rejection: ', rejection);
      }
    )
    .then(
      response5 => {
        console.log(
        "response after INSERT INTO billing_address (undefined means: billing address was not provided): ",
        response5
      );
        return res.status(200).json({ message: `OK, order saved to database for email ${decodedToken.email}`});
    },
      rejection => {
        console.log('Rejection for INSERT INTO billing_address ... billing address not provided ... OK', rejection);
      }
    )
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message:
          "Something went wrong at /order endpoint, check console message!"
      });
    });
});

router.get("/", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
  
  let currentUserID = decodedToken.id;
  let orders = [];
  let ordersCount = 0;
  let counter = 0;
  
  db.query(`SELECT id, user_id, shipping_id, payment_id, orderCreated FROM orders WHERE user_id = ${currentUserID};`)
  .then( orderResponse => {
    //console.log('orderResponse[0][0] is: ' , orderResponse[0][0]);

    ordersCount = orderResponse[0].length;
    
    for(let i=0 ; i<ordersCount ; i++){
        fillOrder()
        .then(
          OneOrder => {
          orders.push( OneOrder );
          counter++;
          counter === ordersCount ? res.status(200).send(orders) : null
        },
          rejection => {
            console.log('fillOrder() Rejection: ', rejection)
          }
        )
        .catch(err => console.log('fillOrder() error: ', err))
    }
    
    async function fillOrder(){

      let order = {};
      let itemPrices = [];
      let suborder = [];

      let orderResponseObj = orderResponse[0][0];

      order.id = orderResponseObj.id;
      //console.log('order.id is: ' + orderResponseObj.id);
      order.user_id = orderResponseObj.user_id;
      //console.log('order.user_id is: ' + orderResponseObj.user_id);
      order.orderCreated = orderResponseObj.orderCreated;
      //console.log('order.orderCreated is: ' + orderResponseObj.orderCreated);

      let shipping_id = orderResponseObj.shipping_id;
      //console.log('shipping_id is: ' + shipping_id);
      let payment_id = orderResponseObj.payment_id;
      //console.log('payment_id is: ' + payment_id);

      let res1 = await db.query(`SELECT name FROM shippingoptions WHERE id = ${shipping_id};`);
      order.shippingName = res1[0][0].name;
      //console.log('order.shippingName is: ' , order.shippingName);

      let res2 = await db.query(`SELECT name FROM paymentoptions WHERE id = ${payment_id};`);
      order.paymentName = res2[0][0].name;
      //console.log('order.paymentName is: ' , order.paymentName);
      
      let res3 = await db.query(`SELECT COUNT(id) FROM suborder WHERE order_id = ${orderResponseObj.id};`);
      let suborderLength = res3[0][0]['COUNT(id)'];
      //console.log('suborderLength is: ' , suborderLength);
      
      for(let i=0 ; i<suborderLength ; i++){
        let res1 = await db.query(`SELECT id, product_id, amount, size, price FROM suborder WHERE order_id = ${orderResponse[0][0].id} ;`);
        //console.log('res1[0] is: ', res1[0]);
        let items = res1[0];
        //console.log('items are: ', items);
        let res2 = await db.query(`SELECT productName FROM products WHERE id = ${items[i].product_id} ;`);
        let productName = res2[0][0]['productName']
        //console.log('productName is: ', productName);
        let res3 = await db.query(`SELECT img FROM products WHERE id = ${items[i].product_id} ;`);
        let img = res3[0][0]['img'];
        //console.log('img is: ', img);

        items[i].img = img;
        items[i].productName = productName;
        //console.log('item.price is: ' + items[i].price);
        itemPrices.push(items[i].price);

        suborder.push(items[i]);
      }

      //console.log('itemPrices is: ', itemPrices);
      order.total = itemPrices.reduce((acc,curr) => acc + curr);
      //console.log('order total is: ' + order.total);
      order.suborder = suborder;
      //console.log('suborder is: ', suborder);
      //console.log('order is: ', order);

      return order;
      
    }

  },
    rejection => { console.log('SELECT FROM orders Rejection: ', rejection); }
  )
  .catch( err => console.log('ERROR at SELECT ... FROM orders: ' + err.message) )

});

module.exports = router;
