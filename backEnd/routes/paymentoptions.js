"use strict";

const db = require("./../connection"); // This connection uses mysql-promise
const express = require("express");
const router = express.Router();
const tokenControl = require("./../middlewares/token_control"); // tokenControl middleware

router.get("/", tokenControl, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    db.query('SELECT * FROM paymentoptions ;')
    .then( paymentoptions => res.status(200).send( paymentoptions[0])  )
    .catch( err => res.status(500).send('Error @ paymentoptions.js @ GET request: ' + err.message))
});

module.exports = router;