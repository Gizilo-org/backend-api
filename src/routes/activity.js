const express = require('express');
const db = require('../config');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM activity WHERE user_id = $1', [req.user.id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { product_id, nama, nutrisi } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO activity (user_id, product_id, nama, nutrisi) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, product_id, nama, nutrisi]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;