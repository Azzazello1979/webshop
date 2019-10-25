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