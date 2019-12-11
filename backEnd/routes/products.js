'use strict';

// save product coming from admin interface

const db = require("./../connection"); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();
const tokenControl = require("./../middlewares/token_control"); // tokenControl middleware


router.post('/', tokenControl, (req, res) => {
    res.setHeader("Content-Type", "application/json");

    db.query(`SELECT * FROM products WHERE productName = '${req.body.productName}';`)
    .then( response1 => {
        if(response1[0].length > 0){
            console.log('product with the same name already exists, choose a different name');
            return res.status(401).json({'message':'product with the same name already exists, choose a different name'})
        } else {

    db.query(`INSERT INTO products (collection, productName, price, stone, carat, cut, img, material, description, sale ) VALUES (
        '${req.body.collection}', '${req.body.productName}', ${req.body.price}, '${req.body.stone}', ${req.body.carat}, '${req.body.cut}', '${req.body.img}', '${req.body.material}', '${req.body.description}', ${req.body.sale});`)
    .then( response2 => {
                        console.log('saved product to db, insert id is ', response2[0].insertId);
                        req.body.sizes.forEach(size => {
                            db.query(`INSERT INTO sizes (product_id, size) VALUES ( ${response2[0].insertId}, ${size} );`)
                        });
                        res.status(200).send((response2[0].insertId).toString()); //send() cannot send a number, so convert it to string
                        
                    })

        }
    })
    .catch( e => {
        console.log(e);
        res.status(500).json({'message':'error occured @ products.js endpoint when saving new product to db. ','error is: ': e.message})
    })

});

module.exports = router;

