const express = require('express');
const db = require('../models/db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM product');
    res.send(result.rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM product WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send(result.rows[0]);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
