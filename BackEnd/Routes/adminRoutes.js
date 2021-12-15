
const router = require('express').Router();
const passport = require('passport');
const isAdmin = require('../middleware/isAdmin');

router.get("/test", passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {
   res.send(req.user)
})

module.exports = router
