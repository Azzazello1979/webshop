const db = require('./../connection');
const express = require('express');
const router = express.Router();



router.get('/', (req,res) => {
  res.setHeader('Content-Type','application/json');
  db.query('SELECT * FROM users;')
  .then(
    (rows) => {
      res.status(200).send(rows);
    }
  )
  .catch(
    () => {
      res.status(500).json({'message':'DB error @ query!'});
    }
  )
})

module.exports = router;
