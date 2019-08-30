'use strict';

const db = require('./../connection');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.status(200).send('register endpoint GET OK');
});

router.post('/', (req, res) => {
  res.status(200).json({'test':'testvalue'});
});

module.exports = router;
