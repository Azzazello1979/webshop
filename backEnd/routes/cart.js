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

router.get('/', tokenControl, (req, res) => {
    res.setHeader('Content-Type','application/json')
    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    let currentUserID = decodedToken.id;
    
    

    const getShippingIDPromise = async() => {
        
        let result = await db.query(`SELECT shipping_id FROM cart WHERE user_id = ${currentUserID};`)
        let theShippingID = result[0][0].shipping_id
        //console.log('theShippingID is: ' + theShippingID)
        return theShippingID
    }

    const getSavedCartProductsPromise = async() => {
        
        let records = await db.query(
            `SELECT products.productName, products.price, cart.size, cart.amount 
             FROM products JOIN cart ON products.id = cart.product_id 
             WHERE cart.user_id = ${currentUserID};
            `)
        
            let mappedObjects = records[0].map(record => {
            return {
                productName: record.productName,
                price: record.price,
                size: record.size,
                amount: record.amount
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
