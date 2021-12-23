
const router = require('express').Router();
const passport = require('passport');
const Pool = require('../db');

router.post("/addCart", passport.authenticate('jwt', { session: false }), async (req, res) => {
   const { item_id, cart_quantity } = req.body
   const user_id = req.user.user_id;
   await Pool.query(`INSERT INTO cart (item_id, cart_quantity, user_id) VALUES($1, $2, $3) RETURNING item_id, cart_quantity`, [item_id, cart_quantity, user_id]);
   const results = await Pool.query(`SELECT item_id, item_price, item_quantity, item_name, item_description FROM items WHERE item_id =$1`, [item_id]);
   res.json(results.rows[0])
});

router.patch("/updateCart", passport.authenticate('jwt', { session: false }), async (req, res) => {
   const { item_id, cart_quantity } = req.body
   const user_id = req.user.user_id;
   try {
      const results = await Pool.query(`UPDATE cart SET cart_quantity = $1 WHERE item_id=$2 AND user_id=$3 RETURNING item_id, cart_quantity`, [cart_quantity, item_id, user_id]);
      res.json(results.rows[0])
   } catch (error) {
      console.log(error);
      res.sendStatus(500)
   }
})
router.get("/getCart", passport.authenticate('jwt', { session: false }), async (req, res) => {
   const user_id = req.user.user_id;
   try {
      const results = await Pool.query(`SELECT i.item_id, c.cart_quantity, i.item_price, i.item_name, i.item_quantity, i.item_description FROM items i, cart c WHERE c.user_id = $1 AND i.item_id=c.item_id`, [user_id]);
      res.json(results.rows)
   } catch (error) {
      console.log(error);
      res.sendStatus(500)
   }
})
router.delete("/removeCartItem", passport.authenticate('jwt', { session: false }), async (req, res) => {
   const { item_id } = req.body;
   const user_id = req.user.user_id;

   try {
      const results = await Pool.query(`DELETE FROM cart WHERE user_id=$1 AND item_id=$2`, [user_id, item_id]);
      res.json(results.rows)

   } catch (error) {
      console.log(error);
      res.sendStatus(500)
   }
})

module.exports = router
