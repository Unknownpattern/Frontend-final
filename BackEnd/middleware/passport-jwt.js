const passport = require("passport");
const passportJwt = require("passport-jwt");
const pool = require("../db");
require("dotenv").config();


const ExtractJwt = passportJwt.ExtractJwt;
const StratagyJwt = passportJwt.Strategy;

passport.use(
   new StratagyJwt({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.jwtSecret
   },
      async function (jwtPayload, done) {
         try {
            const userQuery = await pool.query("SELECT user_email, user_name, user_id, is_admin FROM users WHERE user_id = $1", [jwtPayload.user.user_id]);
            if (userQuery.rowCount === 0) {
               throw error("User not found");
            }
            const user = userQuery.rows[0];
            return done(null, user);
         } catch (error) {
            console.error(error.message);
            return done(error);
         }
      }
   )
);