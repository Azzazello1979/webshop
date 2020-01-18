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

router.get('/', (req, res) => {
    res.setHeader('Content-Type','application/json')
    let currentUserID = 19
    
    

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
                name: record.productName,
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
                console.log('resolvedResponseObj: ', resolvedResponseObj)
            },
            err => console.log(err)
        )
        .catch(err => console.log(err))

    }catch(e){
        console.log(e)
    }
        
   



    
    
    

    


})

/* router.get('/', tokenControl, (req,res) => {
    res.setHeader('Content-Type','application/json');
    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    let currentUserID = decodedToken.id;
    let currentUserID = 19;
    let shippingID = 0;
    let savedCartItemsPromises = [];
    let howManySavedCartItems = 0;
    

    db.query( `SELECT COUNT(id) FROM cart WHERE user_id = ${currentUserID};` )
    .then(
        result => {
            howManySavedCartItems = result;
            try{
                for(let i=0 ; i<howManySavedCartItems ; i++){
                    let savedCartObjPromise = getSavedCartObj();
                    savedCartItemsPromises.push(savedCartObjPromise);
                }
                Promise.all(savedCartItemsPromises)
                .then(
                    savedCartItems => { 

                        let responseObj = {
                            shippingID: shippingID,
                            cartProducts: savedCartItems
                        }
                        res.status(200).send(responseObj)
                    },
                    err => console.log(err)
                ).catch(err => console.log(err))
            }catch(err){
                console.log('ERROR @ cart backend @ getSavedCart() ' + err)
            }

        },
        err => console.log(err)
    )
    .catch(err => console.log(err))
    
    

    async function getSavedCartObj(){
        let query1response = await db.query( `SELECT product_id, size, amount, shipping_id FROM cart WHERE user_id = ${currentUserID};` );
            console.log(query1response[0][0])
        let query2response = await db.query( `SELECT productName, price FROM products WHERE id = ${query1response[0][0].product_id}` );
            console.log(query2response[0][0])

        howManySavedCartItems = query1response[0].length;    
        shippingID = query1response[0][0].shipping_id;

        let savedCartObj = {
            productName: query2response[0][0].productName,
            productSize: query1response[0][0].size,
            productAmount: query1response[0][0].amount,
            productPrice: query2response[0][0].price
        };
        return savedCartObj; 
    }
}); */

module.exports = router;
