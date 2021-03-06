const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
const Pool = require('../db');
const validInfo = require('../middleware/validInfo');
const passport = require('passport');

router.post("/register", validInfo, async (req, res) => {
   try {
      const { name, email, password, isAdmin } = req.body;

      const user = await Pool.query("SELECT * FROM users WHERE user_email = $1",
         [email]);
      if (user.rows.length !== 0) {
         return res.status(401).send("User Already Exists!");
      }
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      encryptedPassword = await bcrypt.hash(password, salt);
      // enters user into database
      let newUser;
      if (isAdmin) {
         newUser = await Pool.query(`INSERT INTO users(user_name, user_email, user_password, is_Admin) VALUES ($1, $2, $3, $4) RETURNING *`, [name, email, encryptedPassword, true]);
      }
      else {
         newUser = await Pool.query(`INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *`, [name, email, encryptedPassword]);
      }

      const token = jwtGenerator(newUser.rows[0].user_id, newUser.rows[0].user_name, newUser.rows[0].user_email, newUser.rows[0].is_admin);
      res.json({
         token,
         name: newUser.rows[0].user_name,
         user_id: newUser.rows[0].user_id,
         email: newUser.rows[0].user_email,
         is_admin: newUser.rows[0].is_admin
      });
   } catch (err) {
      console.error(err.message)
      res.status(500).json("Server Error");
   }
});

router.post("/login", validInfo, passport.authenticate('local', { session: false }), (req, res) => {
   if (req.user) {
      const token = jwtGenerator(req.user.user_id, req.user.user_name, req.user.user_email, req.user.is_admin);
      res.json({
         token,
         name: req.user.user_name,
         user_id: req.user.user_id,
         email: req.user.user_email,
         is_admin: req.user.is_admin
      });
   } else {
      res.status(500).send('server error');
   }
})

router.get("/getUser", passport.authenticate('jwt', { session: false }), (req, res) => {
   if (req.user) {
      const token = jwtGenerator(req.user.user_id, req.user.user_name, req.user.user_email, req.user.is_admin);;
      res.json({
         token,
         name: req.user.user_name,
         user_id: req.user.user_id,
         email: req.user.user_email,
         is_admin: req.user.is_admin
      });
   }
})


module.exports = router;