const jwt = require("jsonwebtoken");
require('dotenv').config();


function jwtGenerator(user_id, name, email, isAdmin) {
   const payload = {
      user: {
         user_id: user_id,
         user_name: name,
         user_email: email,
         is_admin: isAdmin
      }
   }

   return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "24hr" })
}

module.exports = jwtGenerator;