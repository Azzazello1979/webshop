const db = require('./../connection');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type','application/json');
  db.query('SELECT * FROM users;', (err,rows) => {
    if(err){
      console.log(err);
      return res.status(500).send(err);
    } else {
      res.status(200).send(rows);
    }
  })

});

module.exports = router;
