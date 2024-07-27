const {Pool} = require("pg");

const pool = new Pool({
    host: 'localhost',
    user: 'masud@123',
   port:5432,
   database:"bookdb"
  })
  module.exports(pool)