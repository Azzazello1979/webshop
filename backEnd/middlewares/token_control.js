// checks:
//
// use on endpoints where the request must be coming from
// a logged in (authenticated) user that has valid and non-expired token
//
// like: myShoppingCart, editMyProfile, seeMyWishList (anything bound to a logged in user)
//
// 1. existence of token in req.headers
// 2. validity of token ... jwt.verify()
// 3. expiration of token

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function tokenControl(req, res, next){
  if(!req.headers['authorization']){
    console.log(req.headers);
    return res.status(401).json({'message':'authorization header missing!'}) // exists in header?
  } else {
    let theToken = req.headers['authorization'].split(' ')[1]; // Bearer word removed
    jwt.verify(theToken, secret, (err, verified) => { // jwt malformed - if frontend does not attach token to outgoing request
      if(err){
        console.log(err);
        return res.status(401).send(err); // token is not valid
      } else {
        //console.log(verified);
        if( verified.exp < (Date.now()/1000) ){ // token expired
          return res.status(401).json({'message':'Expired token!'});
          // implement sending new accessToken to frontEnd if expiry is close to current time say within 5 minutes!
        } else {
          console.log('token control passed...');
          next(); // exists, valid, not expired ... can continue

        }
      }
    });
  }
}

module.exports = tokenControl;