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
            let deleteResponse = await db.query(`DELETE FROM cart WHERE user_id = ${currentUserID};`);
            console.log('deleteResponse@saveCart(): ');
            console.table(deleteResponse);
            
            let insertResponse = await req.body.cartProducts.forEach(e => {
                db.query(`INSERT INTO cart (user_id, product_id, amount, shipping_id, size) VALUES(
                    ${currentUserID}, ${e.id}, ${e.amount}, ${req.body.shippingOption.id}, ${e.size}
                );`)
            });
            console.log('insertResponse@saveCart(): ');
            console.table(insertResponse);

           

            res.status(200).send(insertResponse);
        }
           

        

});

router.get('/', tokenControl, (req,res) => {
    res.setHeader('Content-Type','application/json');
    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    let currentUserID = decodedToken.id;
    
    try{
        getSavedCart();
    }catch(err){
        console.log('ERROR @ cart backend @ getSavedCart() ' + err)
    }

    async function getSavedCart(){
        let queryResult;
        queryResult = await db.query(
           `SELECT product_id, amount, shipping_id FROM cart WHERE user_id = ${currentUserID};`
           );
           console.log('current saved cart of user: ');
           console.table(queryResult);
           res.status(200).send(queryResult);
    }
});

module.exports = router;
