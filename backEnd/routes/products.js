'use strict';

// save product coming from admin interface

const db = require("./../connection"); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();
const tokenControl = require("./../middlewares/token_control"); // tokenControl middleware


router.post("/", tokenControl, (req, res) => {
    res.setHeader("Content-Type", "application/json");



    db.query(`INSERT INTO products (collection, productName, price, stone, carat, cut, img, material, description, sale ) VALUES (
'${req.body.collection}', '${req.body.productName}', ${req.body.price}, '${req.body.stone}', ${req.body.carat}, '${req.body.cut}', '${req.body.img}', '${req.body.material}', '${req.body.description}', ${req.body.sale});`).
    then( response => {
        console.log('saved product to db, insert id is ', response[0].insertId);
        req.body.sizes.forEach(size => {
            db.query(`INSERT INTO sizes (product_id, size) VALUES ( ${response[0].insertId}, ${size} );`)
        })
        
    }).catch( e => {
        console.log(e);
        res.status(500).json({'message':'error occured @ products.js endpoint when saving new product to db. ','error is: ': e.message})
    })

});

module.exports = router;

