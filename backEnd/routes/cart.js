'use strict';

const db = require('./../connection'); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenControl = require('./../middlewares/token_control'); // tokenControl middleware

router.post('/', tokenControl, (req,res) => {
    res.setHeader('Content-Type','application/json');
    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    let currentUserID = decodedToken.id;

    try{
        saveCart();
    }catch(err){
        console.log('ERROR@cart endpoint - error saving cart to DB: ' + err);
        return res.status(500).json({'message':'ERROR@cart endpoint - error saving cart to DB: ' + err});
    }
    

        async function saveCart(){
            await req.body.cartProducts.forEach(e => {
                db.query(`INSERT INTO cart (user_id, product_id, amount, shipping_id) VALUES(
                    ${currentUserID}, ${e.id}, ${e.amount}, ${req.body.shippingOption.id}
                );`)
            });
        }
           
    console.log('@cart endpoint: OK, cart saved to DB.');    
    res.status(200).json({'message':'@cart endpoint: OK, cart saved to DB.'});
        

});




router.get('/', tokenControl, (req,res) => {
    res.setHeader('Content-Type','application/json');
    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    let currentUserID = decodedToken.id;
    
    let queryResult;

    try{
        getSavedCart();
    }catch(err){
        console.log('ERROR @ cart backend @ getSavedCart() ' + err)
    }

    async function getSavedCart(){
       queryResult = await db.query(
           `SELECT product_id, amount FROM suborder JOIN orders ON orders.id = suborder.order_id WHERE orders.user_id = ${currentUserID}`
           );
    }

    res.status(200).send(queryResult);

});



module.exports = router;
