'use strict';

// module imports...
const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

// require routes...
const registerRoute = require('./routes/register');

// use middlewares...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// use routes...
app.use('/register', registerRoute);

// TEST connection
app.get('/test', (req, res) => {
  res.status(200).send('OK...Backend connected!')
});


// EXPRESS connect & check
app.listen(PORT, () => {
  console.log('OK...Express listening on ' + PORT)
});