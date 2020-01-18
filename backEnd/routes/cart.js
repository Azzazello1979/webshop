'use strict';

const db = require('./../connection'); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenControl = require('./../middlewares/token_control'); // tokenControl middleware


router.post('/', tokenControl, (req,res) => {
    console.log('req.body.cartProducts is: ', req.body.cartProducts)
    console.log('req.body.shippingOption is: ', req.body.shippingOption)
    res.setHeader('Content-Type','application/json');
    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    let currentUserID = decodedToken.id;

    let saveCart = async() => {
        let deleteResponse = await db.query(`DELETE FROM cart WHERE user_id = ${currentUserID};`);
        console.log('deleteResponse@saveCart(): ', deleteResponse)
    
        let cartRecordsInsertedPromise = []
        req.body.cartProducts.forEach(e => {
            
            let cartRecordInsertedPromise = db.query(`INSERT INTO cart (product_id, amount, user_id, shipping_id, size, UID) VALUES(
                ${e.id}, ${e.amount}, ${currentUserID}, ${req.body.shippingOption.id}, ${e.size}, "${e.UID}"
            );`)
            cartRecordsInsertedPromise.push(cartRecordInsertedPromise)
        });
        let cartRecordsResolved = await Promise.all(cartRecordsInsertedPromise)
        
        console.log('cartRecordsResolved: ', cartRecordsResolved)
        
    }

    try{
        saveCart()
        .then(
            ok => {
                console.log('OK, all cart items stord in DB.')
                res.status(200).send('OK, all cart items stord in DB.')
            },
            err => console.log(err)
        )
        .catch(err => console.log(err))

    }catch(err){
        console.log('ERROR@cart endpoint - error saving cart to DB: ' + err);
        return res.status(500).json({'message':'ERROR@cart endpoint - error saving cart to DB: ' + err});
    }


        
           
});

router.get('/', tokenControl, (req, res) => {
    res.setHeader('Content-Type','application/json')
    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    let currentUserID = decodedToken.id;
    
    

    const getShippingIDPromise = async() => {
        let theShippingID = 1
        let result = await db.query(`SELECT shipping_id FROM cart WHERE user_id = ${currentUserID};`)
        if(!result[0] === 'undefined'){ //if result is undefined, this user has no saved cart item record, so theShippingID stays at default 1, that is 'free'
            theShippingID = result[0][0].shipping_id
        }
        
        console.log('theShippingID is: ' + theShippingID)
        return theShippingID
    }

    const getSavedCartProductsPromise = async() => {
        
        let records = await db.query(
            `SELECT products.id, products.productName, products.price, cart.size, cart.amount, cart.UID 
             FROM products JOIN cart ON products.id = cart.product_id 
             WHERE cart.user_id = ${currentUserID};
            `)
        
            let mappedObjects = records[0].map(record => {
            return {
                id: record.id,
                productName: record.productName,
                price: record.price,
                size: record.size,
                amount: record.amount,
                UID: record.UID
                }
            })

        //console.log('savedCartProducts: ', savedCartProducts)
        return mappedObjects
    }

    const createResponseObjPromise = async() => {
        let shippingID = await getShippingIDPromise()
        let savedCartProducts = await getSavedCartProductsPromise()

        let responseObj = {
            'shippingID':shippingID,
            'savedCartProducts':savedCartProducts 
        }

        return responseObj
    }

    try{
        createResponseObjPromise()
        .then(
            resolvedResponseObj => {
                //console.log('resolvedResponseObj: ', resolvedResponseObj)
                res.status(200).send(resolvedResponseObj)
            },
            err => console.log(err)
        )
        .catch(err => console.log(err))

    }catch(e){
        console.log(e)
    }
})

module.exports = router;
