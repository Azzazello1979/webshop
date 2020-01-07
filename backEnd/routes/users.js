const db = require('./../connection'); // This connection uses mysql-promise
const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
  res.setHeader('Content-Type','application/json');
  let errorBreadcrumb = 'users.js >> get >> ';

  db.query('SELECT * FROM users;')
  .then(
    rows => res.status(200).send(rows),
    rejection => {
      console.log(errorBreadcrumb, 'SELECT * FROM users rejection: ', rejection);
      res.status(500).send(errorBreadcrumb, 'SELECT * FROM users rejection: ', rejection)
    }
  )
  .catch(
    err => {
      console.log(errorBreadcrumb, 'DB query error @ SELECT * FROM users: ', err);
      res.status(500).send(errorBreadcrumb, 'DB query error @ SELECT * FROM users: ', err);
    }
  )
})

module.exports = router;
