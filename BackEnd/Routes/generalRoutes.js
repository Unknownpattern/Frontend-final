
const router = require('express').Router();
const Pool = require('../db');

router.get('/getData', async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const startIndex = (page - 1) * limit;
  try {
    let temp = await Pool.query(`SELECT item_id, item_name, item_price, item_quantity, item_description, item_image FROM items ORDER BY item_id DESC LIMIT $1 OFFSET $2`, [limit, startIndex]);

    res.json(temp.rows);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500).end();
  }
})
router.get('/getItem', async (req, res) => {
  const id = req.query.id;
  try {
    let result = await Pool.query(`SELECT item_id, item_name, item_price, item_description, item_image FROM items WHERE item_id=$1`, [id]);
    if (result.rowCount > 0) {
      return res.json(result.rows[0])
    }
    else {
      return res.sendStatus(400)
    }

  }
  catch (error) {
    res.sendStatus(500)
  }
})

module.exports = router