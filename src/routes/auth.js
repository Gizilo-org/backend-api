const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const authMiddleware = require('../middlewares/authMiddleware');
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, jenis_kelamin, tanggal_lahir, berat_badan, tinggi_badan } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const result = await db.query(
      'INSERT INTO users (username, password, jenis_kelamin, tanggal_lahir, berat_badan, tinggi_badan) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, hashedPassword, jenis_kelamin, tanggal_lahir, berat_badan, tinggi_badan]
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
