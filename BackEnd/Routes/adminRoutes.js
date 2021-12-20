
const router = require('express').Router();
const Pool = require('../db');
const passport = require('passport');
const isAdmin = require('../middleware/isAdmin');

router.post("/addItem", passport.authenticate("jwt", { session: false }), isAdmin, async (req, res) => {

   const { item_name, item_description, item_price, item_original_quantity } = req.body.item;
   if (![item_name, item_description, item_price, item_original_quantity].every(Boolean)) {
      return res.status(400).send('not enough data');
   }
   try {
      const item = await Pool.query(`INSERT INTO items(item_name, item_description, item_price, item_quantity, item_original_quantity) VALUES ($1, $2, $3, $4, $4) RETURNING *`,
         [item_name, item_description, item_price, item_original_quantity]);
      // console.log(id);
      return res.json(item.rows[0]);
   } catch (error) {
      console.log(error.message)
      res.sendStatus(500).end();
   }

})

router.get('/getItems', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
   const itemlist = await Pool.query(`SELECT * FROM items`);

   return res.send(itemlist.rows);
})

router.get('/getUsers', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
   const itemlist = await Pool.query(`SELECT user_name, user_id, user_email FROM users`);
   return res.send(itemlist.rows);
})

router.post('/updateItem', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
   const { item_id, item_name, item_description, item_price, item_quantity, item_original_quantity } = req.body.item;
   try {
      let updatedItem = await Pool.query(`UPDATE items SET item_name = $1, item_description = $2, item_price = $3, item_quantity = $4, item_original_quantity = $5 WHERE item_id = $6 RETURNING *`, [item_name, item_description, item_price, item_quantity, item_original_quantity, item_id]);
      res.send(updatedItem.rows[0]).end();
   } catch (error) {
      console.error(error.message);
      res.status(500).end()
   }
})

router.delete('/deleteItem/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
   const id = req.params.id
   try {
      if (id) {
         await Pool.query(`DELETE FROM items WHERE item_id = $1`, [id]);
         return res.json({ message: 'done' }).end();
      }
      else {
         return res.status(400).end();
      }
   } catch (error) {
      console.log(error);
      res.status(500).end();
   }
})

module.exports = router
