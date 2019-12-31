"use strict";

// save product coming from admin interface

const db = require("./../connection"); // This connection uses mysql-promise
const express = require("express");
const router = express.Router();
const tokenControl = require("./../middlewares/token_control"); // tokenControl middleware

router.post("/", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const {
    collection,
    productName,
    price,
    stone,
    carat,
    cut,
    img,
    material,
    description,
    sale,
    sizes
  } = req.body;

  db.query(`SELECT * FROM products WHERE productName = '${productName}';`)
    .then(response1 => {
      if (response1[0].length > 0) {
        console.log(
          "product with the same name already exists, choose a different name"
        );
        return res
          .status(401)
          .json({
            message:
              "product with the same name already exists, choose a different name"
          });
      } else {
        db.query(
          `INSERT INTO products (collection, productName, price, stone, carat, cut, img, material, description, sale ) VALUES (
        '${collection}', '${productName}', ${price}, '${stone}', ${carat}, '${cut}', '${img}', '${material}', '${description}', ${sale});`
        ).then(response2 => {
          console.log(
            "saved product to db, insert id is ",
            response2[0].insertId
          );
          sizes.forEach(size => {
            db.query(
              `INSERT INTO sizes (product_id, size) VALUES ( ${response2[0].insertId}, ${size} );`
            );
          });
          res.status(200).send(response2[0].insertId.toString()); //send() cannot send a number, so convert it to string
        });
      }
    })
    .catch(e => {
      console.log(e);
      res
        .status(500)
        .json({
          message:
            "error occured @ products.js endpoint when saving new product to db. ",
          "error is: ": e.message
        });
    });
});


// this is the one WITH sending back sizes...
router.get("/", tokenControl, (req, res) => {
    res.setHeader("Content-Type", "application/json");

    let originalProducts = [];
    let mappedProducts = [];

    let responseIsSent = false;
    
    db.query(`SELECT * FROM products ;`)
      .then(products => {
        originalProducts = products[0];
        //console.log('original products: ')
        //console.log(originalProducts)
        

        for (let i = 0; i < originalProducts.length; i++) {
          mappedObject(originalProducts[i])
            .then(mappedObj => {
              //console.log('this is the mapped object received, now to push inside arr: ')
              //console.log(mappedObj) // working so far, receiving the mapped obj fine

              mappedProducts.push(mappedObj);

              //console.log(`the originalProducts array length is: ${originalProducts.length}`)
              //console.log(`the mappedProducts array length is: ${mappedProducts.length}`)
              //console.log(mappedProducts);

            }).catch(err => console.log(err.message));
        }
              
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: `Error @ products.js endpoint @ GET request, error is: ${err.message}`
          });
      });

    async function mappedObject(product) {
      let productObj = { ...product };
      let response = await db.query(
        `SELECT size FROM sizes WHERE product_id = ${product.id};`
      );
      let sizesArr = [];
      response[0].forEach(e => {
        sizesArr.push(e.size);
      });
      //console.log('the sizes array: ')
      //console.log(sizesArr);
      productObj.sizes = sizesArr;
      //console.log('the productObj by mappedObject(): ')
      //console.log(productObj)
      return productObj; // working fine! returning the mapped productObj
    }
        
    setInterval(() => { 
      if(responseIsSent === false){
        if(mappedProducts.length === originalProducts.length){
          res.status(200).send( mappedProducts );
          responseIsSent = true;
          return;
        } 
      }
     }, 100)
    
  });


// patch ...
router.patch("/", tokenControl, (req, res) => {
  res.setHeader('Content-Type','application/json');

  let productID = req.body.id;
  let reqBody = {...req.body};
  delete reqBody.id; // we dont need this key-value pair when we iterate and fill up below arrays columns, values

  let columns = [];
  let values = [];

for(let key in reqBody){ 
  if(key === 'sizes'){ // to deal with the size array...
    let sizeArr = reqBody.sizes;

    // 1st delete all size entries for that id...

    try{
      doIt()
    }catch(e){
      console.log('ERROR @ doIt(): ', e.message);
    }

    async function doIt(){
      await db.query(` DELETE FROM sizes WHERE product_id = ${productID} ;`);
      await sizeArr.forEach(e => {
        return db.query(` INSERT INTO sizes (size, product_id) VALUES (${e}, ${productID}) ;`)
      });
    }
    

    
  } else { // primitive...
      columns.push( key );
      values.push( reqBody[key] );
  }
}

    // by this time sizeArray is dealt with & columns and values arrays are filled up
    if(columns.length > 0){ // if there is at least one primitive to patch...
      let setString = "";
    
      for(let i=0 ; i<columns.length ; i++){
        if(typeof values[i] === 'number'){
          setString += `${columns[i]} = ${values[i]}, `
        } else if(typeof values[i] === 'string'){
          setString += `${columns[i]} = '${values[i]}', `
        }
      }
      setString = setString.slice(0,setString.length-2);
      
  
      db.query(` UPDATE products SET ${setString} WHERE id = ${productID} ;`)
      .then( response => {
        console.log('UPDATE products response: ', response);
        //res.status(200).json({'message':'products.js >> OK, record patched'});
        let answer = req.body;
        res.status(200).json(answer);
      })
      .catch( error => {
        console.log('products.js >> patch >> UPDATE products error: ', error.message);
        return res.status(500).json({'message':`products.js >> patch >> UPDATE products error: ${error.message}`}); 
      })
    }
    

    

})

// delete product
router.delete("/:id", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let productID = req.params.id;
  console.log('this is the productID: ', productID);

  db.query(`DELETE FROM products WHERE id = ${productID}`)
  .then(
    fulfilled => {
      console.log(fulfilled);
      res.status(200).json({ 'id':productID });
    },
    rejected => {
      console.log(rejected)
    }
  )
  .catch(error => {
    console.log('Error @ products.js endpoint at router.delete @ delete request: ' + error.message);
    res.status(500).send('Error @ products.js endpoint at router.delete @ delete request: ' + error.message);
  })

})

module.exports = router;
