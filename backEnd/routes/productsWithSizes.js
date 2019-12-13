'use strict';

// save product coming from admin interface

const db = require("./../connection"); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();
const tokenControl = require("./../middlewares/token_control"); // tokenControl middleware

router.get('/', (req, res) => {
    res.setHeader("Content-Type", "application/json");

    db.query(`SELECT size FROM sizes WHERE product_id = 24;`)
    .then( response => {

        let sizesArr = [];
        response[0].forEach(e => {
            sizesArr.push( e.size )
        })

        res.status(200).send(sizesArr);
    })
    .catch( err => {
        res.status(500).json({'message' : `Error @ productsWithSizes.js endpoint @ GET request, error is: ${err.message}`})
    })
});

module.exports = router;

