module.exports = (req, res, next) => {
   if (req.user.is_admin) {
      next();
   }
   else {
      res.status(401).send("Unauthorized")
   }

}