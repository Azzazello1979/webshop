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

router.get(
  "/",
  /*tokenControl,*/ (req, res) => {
    res.setHeader("Content-Type", "application/json");

    let mappedProducts = [];

    db.query(`SELECT * FROM products ;`)
      .then(products => {
        let originalProducts = products[0];
        //console.log('original products: ')
        //console.log(originalProducts)

        for (let i = 0; i < originalProducts.length; i++) {
          mappedObject(originalProducts[i])
            .then(mappedObj => {
              //console.log('this is the mapped object received, now to push inside arr: ')
              //console.log(mappedObj) // working so far, receiving the mapped obj fine

              let pushThis = mappedObj;

              mappedProducts.push(pushThis);

              //console.log(`the originalProducts array length is: ${originalProducts.length}`)
              //console.log(`the mappedProducts array length is: ${mappedProducts.length}`)
              //console.log(mappedProducts);
            })
            .catch(err => console.log(err.message));
        }

        //res.status(200).send(mappedProducts);
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
  }
);

module.exports = router;
