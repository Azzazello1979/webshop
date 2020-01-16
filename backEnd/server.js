'use strict';

// module imports...
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;


// use middlewares...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//console.log('__dirname is: ' + __dirname);
app.use('/public', express.static(path.join(__dirname + '/uploads')));
// "/public" the 1st arg. is: what to do when this path is requested (this is the path that will appear publicly)
// second arg. is the express.static() func., it has only one arg.: where is the dir that will serve all static files. 
// path.join() concats the root directory of the nodejs app ( __dirname ) with the folder that has the static files on the server.
// "/uploads" here is the "secret" directory, not visible to the public, instead, "/public" is visible  


// require routes...
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');
const cartRoute = require('./routes/cart');
const wishRoute = require('./routes/wish');
const productsRoute = require('./routes/products');
const shippingOptions = require('./routes/shippingoptions');
const paymentOptions = require('./routes/paymentoptions');


// use routes...
app.use('/register', registerRoute);
app.use('/users', usersRoute);
app.use('/login', loginRoute);
app.use('/orders', ordersRoute);
app.use('/cart', cartRoute);
app.use('/wish', wishRoute);
app.use('/products', productsRoute);
app.use('/shippingoptions', shippingOptions);
app.use('/paymentoptions', paymentOptions);


// TEST connection
app.get('/test', (req, res) => {
  res.status(200).send('OK...Backend connected!')
});


// EXPRESS connect & check
app.listen(PORT, () => {
  console.log('OK...Express listening on ' + PORT)
});
