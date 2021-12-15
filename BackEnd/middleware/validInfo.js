const e = require('express');
const Joi = require('joi');

module.exports = (req, res, next) => {
   const { email, name, password } = req.body;

   function validateEmail(email) {
      const schema = Joi.object({
         email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
      });
      const { error } = schema.validate({ email })
      return !Boolean(error);
   }

   if (req.path === '/register') {
      if (![email, name, password].every(Boolean)) {
         return res.status(401).json("Missing Credentials");
      }
      else if (!validateEmail(email)) {
         return res.status(401).json("Invalid Email");
      }
   } else if (req.path === '/login') {
      if (![email, password].every(Boolean)) {
         return res.status(401).json("Missing Credentials");
      }
      else if (!validateEmail(email)) {
         return res.status(401).json("Invalid Email");
      }
   }
   else {
      res.status(400).json("Unknown Route");
   }
   next();
}