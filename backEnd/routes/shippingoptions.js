"use strict";

const db = require("./../connection"); // This connection uses mysql-promise
const express = require("express");
const router = express.Router();
const tokenControl = require("./../middlewares/token_control"); // tokenControl middleware

router.get("/", (req, res) => {
    res.setHeader("Content-Type", "application-json");
    db.query('SELECT * FROM shippingoptions ;')
    .then( shippingoptions => res.status(200).send(shippingoptions)  )
    .catch( err => res.status(500).send('Error @ shippingoptions.js @ GET request: ' + err.message))
});

module.exports = router;
