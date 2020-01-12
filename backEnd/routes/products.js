"use strict";

// save product coming from admin interface
const db = require("./../connection"); // This connection uses mysql-promise 
const express = require("express");
const router = express.Router();
const tokenControl = require("./../middlewares/token_control"); // tokenControl middleware
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './tempUploads'}); //uploadDir is relative to the root of the NodeJS main dir
const fs = require('fs');

router.post("/", tokenControl, multipartMiddleware, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  //req.body is a FormData Obj, so its all strings...
  //console.log(req.body.sizes)
  //console.log(typeof req.body.sizes)
  //console.log(req['body']);
  //console.log(req['files']);

  let mainImageOK = false; // main image processed?
  let newProductID = null; // the id of the freshy inserted product

  const {
    collection,
    productName,
    price,
    stone,
    carat,
    cut,
    material,
    description,
    sale,
    sizes
  } = req.body;

  // everything comes through as string ... so convert these to nums
  let priceP = parseInt(price, 10);
  let caratP = parseInt(carat, 10);
  let saleP = parseInt(sale, 10);
  let sizesA = sizes.split(',');
  let sizesP = sizesA.map(e => parseInt(e, 10));

  
  
    // deal with incoming images...
    let tempFilePath = req['files']['mainImageObj']['path'];
    //console.log('tempFilePath: ' + tempFilePath);

    let newFileName = req['files']['mainImageObj']['originalFilename'];
    //console.log('newFileName: ' + newFileName);

    let tempFileName = tempFilePath.slice(23,tempFilePath.length);
    //console.log('tempFileName: ' + tempFileName);

    let copyRenameDelete = () => {
      fs.copyFile(tempFilePath, `./../../webshop/frontEnd/webshop/src/assets/images/collections/${collection}/${tempFileName}`, (err) => {
        if(err){
          console.log('Error when copying file to frontEnd: ', err);
        } else {
          fs.rename(`./../../webshop/frontEnd/webshop/src/assets/images/collections/${collection}/${tempFileName}`, `./../../webshop/frontEnd/webshop/src/assets/images/collections/${collection}/${newFileName}`, (err) => {
            if(err){
              console.log('Error when renaming: ', err);
            } else {
              fs.unlink(tempFilePath, (err) => {
                if(err){
                  console.log('Error when deleting temp. file: ', err);
                } else {
                  mainImageOK = true;
                  console.log('mainImage processed OK!');
                }
              })
            }
          })
        }
      })
    }

    fs.mkdir(`./../../webshop/frontEnd/webshop/src/assets/images/collections/${collection}`, (err) => {
      if(err){
        if(err.code === 'EEXIST'){
          console.log(`NOTE: The collection dir ${collection} already exists. Going on.`);
          copyRenameDelete();
        } else {
          console.log(`Error when trying to make new collection directory ${collection} on frontEnd: `, err)
        }
      } else {
        console.log('OK...new dir created at frontEnd.')
        copyRenameDelete();
      }
    })
    





  // deal with incoming product objects...
  //console.log('objToSave: ', req['body']);
  
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
        let filename = req['files']['mainImageObj']['originalFilename'];
        let imgPath = `assets/images/collections/${collection}/${filename}`;
        db.query(
          `INSERT INTO products (collection, productName, price, stone, carat, cut, img, material, description, sale ) VALUES (
        '${collection}', '${productName}', ${priceP}, '${stone}', ${caratP}, '${cut}', '${imgPath}', '${material}', '${description}', ${saleP});`
        ).then(response2 => {
          newProductID = response2[0].insertId;
          console.log(
            "saved product to db, insert id is ",
            newProductID
          );


          let sizePromises = [];
          sizesP.forEach(asize => {
            let sizePromise = db.query(
              `INSERT INTO sizes (product_id, size) VALUES ( ${newProductID}, ${asize} );`
            );
            sizePromises.push(sizePromise);
          });

           
          

          Promise.all(sizePromises)
          .then( 
            () => {
               
              db.query(`SELECT size FROM sizes WHERE product_id = ${newProductID}`)
              .then(
                sizes => {
                let sizesFromDB = sizes;

                db.query(`SELECT * FROM products WHERE id = ${newProductID}`)
              .then(
                response => {
                  let responseObj = response[0][0];
                  responseObj['sizes'] = sizesFromDB[0].map(e => e.size);

                  console.log('responseObj: ', responseObj);

                  if(mainImageOK){
                    res.status(200).send(responseObj);
                    console.log('All OK. DB updated & mainImage processed, sending responseObj: ', responseObj);
                  } else {
                    let waitingForMainImageToBeProcessed = setInterval(() => {
                      if(mainImageOK){
                        res.status(200).send(responseObj);
                        console.log('All OK. DB updated & mainImage processed, sending responseObj: ', responseObj);
                        clearInterval(waitingForMainImageToBeProcessed);
                      } else {
                        console.log('mainImage not processed yet...')
                      }
                    }, 100)
                  }
                },
                rejected => console.log('SELECT newProductObj was rejected: ', rejected)
              )
              .catch(e => console.log('db query error: ', e.message))  


              },
                reject => console.log(reject))
              .catch(e=>console.log(e));

              

              
          },
            rejection => {
              console.log('products.js >> POST >> Promise.all() rejected for INSERT INTO sizes: ', rejection);
              return res.status(500).send('products.js >> POST >> Promise.all() rejected for INSERT INTO sizes: ', rejection)
            }
          ).catch(err => {
            console.log('products.js >> POST >> Promise.all() error: ', err);
            return res.status(500).send('products.js >> POST >> Promise.all() error: ', err);
          })
          
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

            }, rejected => console.log('mappedObject() rejected: ', rejected)
            ).catch(err => console.log('mappedObject() error: ', err));
        }     
      },
        rejected => {
          console.log('SELECT * FROM products rejected: ', rejected)
        }
      )
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
        
    // this approach is obsolate, use Promise.all() to send response to frontEnd after loop of promise objects all resolve!
    // keeping for reference only 
    let theInterval = setInterval(() => { 
        if(mappedProducts.length === originalProducts.length){
          res.status(200).send( mappedProducts );
          return clearInterval(theInterval);
        } 
     }, 300)
    
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
