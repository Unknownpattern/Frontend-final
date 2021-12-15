const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db");
const bcrypt = require("bcrypt");

const authenticateUser = async (email, password, done) => {
   try {
      const user = await pool.query(`SELECT * FROM users WHERE user_email = $1`, [email]);
      if (user.rows.length === 0) {
         throw "Password or Email is incorrect";
      }
      const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
      if (!validPassword) {
         throw "Password or Email is incorrect";
      }
      return done(null, user.rows[0]);

   } catch (error) {
      if (error.message) {
         console.error(error.message);
         return done(error);
      }
      console.error(error);
      return done(null, false, { message: error });
   }
}

passport.use(new LocalStrategy({
   usernameField: "email",
   passwordField: "password"
}, authenticateUser)
);