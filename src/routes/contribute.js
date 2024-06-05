const express = require('express');
const auth = require('../middlewares/authMiddleware');
const db = require('../models/db');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { product_id, jumlah_contribute } = req.body;
  const user_id = req.user.id;

  try {
    const result = await db.query(
      'INSERT INTO contribute (user_id, product_id, jumlah_contribute, created_at, last_modified) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
      [user_id, product_id, jumlah_contribute]
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;