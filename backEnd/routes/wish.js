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
        saveWish();
    }catch(err){
        console.log('ERROR@wish endpoint - error saving wish to DB: ' + err);
        return res.status(500).json({'message':'ERROR@wish endpoint - error saving wish to DB: ' + err});
    }
    
    
        async function saveWish(){
            await req.body.forEach(e => {
                 db.query(`INSERT INTO wish (user_id, product_id) VALUES(
                    ${currentUserID}, ${e.id}
                );`)
            });
        }


        console.log('@wish endpoint: OK, wish list saved to DB.');
        res.status(200).json({'message':'@wish endpoint: OK, wish list saved to DB.'});
        
})

module.exports = router;
