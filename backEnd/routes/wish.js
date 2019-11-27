"use strict";

const db = require("./../connection"); // This connection uses mysql-promise
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const tokenControl = require("./../middlewares/token_control"); // tokenControl middleware

router.post('/', tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
  let currentUserID = decodedToken.id;

  try {
    saveWish();
  } catch (err) {
    console.log("ERROR@wish endpoint - error saving wish to DB: " + err);
    return res
      .status(500)
      .json({
        message: "ERROR@wish endpoint - error saving wish to DB: " + err
      });
  }

           async function saveWish(){
            
            let deleteResponse = await db.query(`DELETE FROM wish WHERE user_id = ${currentUserID};`);
            console.log('deleteResponse@saveWish(): ');
            console.table(deleteResponse);

            let insertResponse = await req.body.forEach(e => {
                 db.query(`INSERT INTO wish (user_id, product_id) VALUES(
                    ${currentUserID}, ${e.id}
                );`)
            });
            console.log('insertResponse@saveWish(): ');
            console.table(insertResponse);
            res.status(200).send(insertResponse);
        } 




});

router.get('/', tokenControl, (req,res) => {
    res.setHeader('Content-Type','application/json');
    let decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    let currentUserID = decodedToken.id;


    try{
        getSavedWish();
    }catch(err){
        return console.log('ERROR @ cart backend @ getSavedWish() ' + err)
    }

    async function getSavedWish(){
        
        let response = await db.query(
           `SELECT product_id FROM wish WHERE user_id = ${currentUserID};`
           );

           console.log('current saved wish items of user: ');
           console.table(response);
           res.status(200).send(response);
    }



});

module.exports = router;
