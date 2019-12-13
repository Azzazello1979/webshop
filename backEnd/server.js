'use strict';

// module imports...
const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;


// use middlewares...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// require routes...
const registerRoute = require('./routes/register');
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login');
const ordersRoute = require('./routes/orders');
const cartRoute = require('./routes/cart');
const wishRoute = require('./routes/wish');
const productsRoute = require('./routes/products');
const productsWithSizesRoute = require('./routes/productsWithSizes');


// use routes...
app.use('/register', registerRoute);
app.use('/users', usersRoute);
app.use('/login', loginRoute);
app.use('/orders', ordersRoute);
app.use('/cart', cartRoute);
app.use('/wish', wishRoute);
app.use('/products', productsRoute);
app.use('/productsWithSizes', productsWithSizesRoute);


// TEST connection
app.get('/test', (req, res) => {
  res.status(200).send('OK...Backend connected!')
});


// EXPRESS connect & check
app.listen(PORT, () => {
  console.log('OK...Express listening on ' + PORT)
});
