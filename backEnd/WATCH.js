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