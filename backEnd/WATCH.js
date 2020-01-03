// using mysql-promise package

// query
db.query(`SELECT id FROM users WHERE email = '${decodedToken.email}';`)
// response
[ [ RowDataPacket { id: 2 } ],
  [ FieldPacket {
      catalog: 'def',
      db: 'theringemporium',
      table: 'users',
      orgTable: 'users',
      name: 'id',
      orgName: 'id',
      charsetNr: 63,
      length: 11,
      type: 3,
      flags: 16899,
      decimals: 0,
      default: undefined,
      zeroFill: false,
      protocol41: true } ] ]



// order object
{ token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMuY29tIiwiaWF0IjoxNTcxOTQ2NzM1LCJleHAiOjE1NzE5NTc1MzV9.2biPGJPFNP9F6lmrKLNo56-Gkx93dWGDeRZVu0JVbTA',
   shippingOption: 3,
   paymentOption: 3,
   shippingAddress:
    { name: 'Xoxo Moxo',
      country: 'Kenya',
      state: 'Shire Megye',
      county: 'Shire Megye',
      city: 'KongKong',
      ZIP: 555,
      POBOX: '',
      address1: 'Öv utca 1',
      address2: '',
      extra: '' },
   products: [ { id: 12, amount: 1 } ] }

   // INSERT INTO OK Packet
   [ OkPacket {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 3,
      serverStatus: 2,
      warningCount: 0,
      message: '',
      protocol41: true,
      changedRows: 0 },
    undefined ]


// saveCart() request:

[ { id: 1,
  collection: 'Rittis',
  productName: 'Rittis-1',
  isWished: false,
  price: 92.95,
  totalPrice: 92.95,
  stone: 'sona diamond',
  carat: 15,
  cut: 'cushion',
  img: './../../assets/images/collections/rittis/Rittis-1.jpg',
  material: 'yellow gold 18k',
  description: 'blah blah blah',
  amount: 1,
  sale: 0.85,
  show: 0.8,
  sizes: 0,
  gallImages: 0 },
{ id: 4,
  collection: 'Biafin',
  productName: 'Biafin-1',
  isWished: false,
  price: 23.95,
  totalPrice: 23.95,
  stone: 'zircone',
  carat: 0,
  cut: 'flower',
  img: './../../assets/images/collections/biafin/Biafin-1.jpg',
  material: 'dipped rose gold',
  description: 'blah blah blah',
  amount: 1,
  sale: 0.85,
  show: 0.8,
  sizes: 0,
  gallImages: 0 },
{ id: 11,
  collection: 'Prestias',
  productName: 'Prestias-2',
  isWished: false,
  price: 143.95,
  totalPrice: 143.95,
  stone: 'real diamond',
  carat: 1,
  cut: 'heart',
  img: './../../assets/images/collections/prestias/Prestias-2.jpg',
  material: 'rose gold 18k',
  description: 'blah blah blah',
  amount: 1,
  sale: 0.85,
  show: 0.8,
  sizes: 0,
  gallImages: 0 } ] { id: 3,
name: 'FedEx',
cost: 22,
minDays: 5,
maxDays: 12,
imgSrc: './../../assets/icons/Shipping-4-icon.png' }
    

//orders array to send back to front
[
{
  "id": 56,
  "user_id": 19,
  "orderCreated": "2020-01-02T21:40:29.000Z",
  "shippingName": "ePacket",
  "paymentName": "MasterCard",
  "total": 492.85,
  "suborder": [
      {
          "id": 66,
          "product_id": 35,
          "amount": 1,
          "size": null,
          "price": 22.95,
          "img": "./../../assets/images/collections/sultavia/Sultavia-2.jpg",
          "productName": "Sultavia Rainbow"
      },
      {
          "id": 67,
          "product_id": 34,
          "amount": 1,
          "size": null,
          "price": 87.95,
          "img": "./../../assets/images/collections/sultavia/Sultavia-1.jpg",
          "productName": "Sultavia Sapphire"
      },
      {
          "id": 68,
          "product_id": 36,
          "amount": 1,
          "size": null,
          "price": 381.95,
          "img": "./../../assets/images/collections/sultavia/Sultavia-3.jpg",
          "productName": "Sultavia Burma Ruby"
      }
  ]
}

]