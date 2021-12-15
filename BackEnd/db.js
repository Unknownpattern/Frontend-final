const Pool = require('pg').Pool;
const localVals = {
   user: "postgres",
   password: "Welcome1",
   host: "localhost",
   port: 5432,
   database: "final_project"
}
const productionVals = {
   connectionString: process.env.DATABASE_URL,
   ssl: {
      rejectUnauthorized: false
   }
}

const pool = new Pool((process.env.NODE_ENV === 'production') ? productionVals : localVals);
module.exports = pool;
