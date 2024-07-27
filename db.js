const {Pool} = require("pg");


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
   port:5432,
   password:"sakib1431",
   database:"bookdb"
  })
  module.exports=pool