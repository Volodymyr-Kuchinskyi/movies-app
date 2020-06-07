const express = require('express');
const { uuid } = require('uuidv4');

const authRoutes = express.Router();

const { dbClient } = require('../db');

authRoutes.get('', async (req, res) => {
  const { rows: result } = await dbClient.query('select now();');
  res.send('Hello World');
});

authRoutes.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    const { rows: [result] } = await dbClient.query(`
      select id, login from users
      where login = $1 and password = $2
    `, [login, password]);

    if (!result) {
      return res.status(401).json({ err: 'Unauthorized' });
    }

    res.json({ id: result.id, login: result.login });
  } catch (err) {
    console.log({ err });
    res.status(400).json({ err });
  }
});

authRoutes.post('/register', async (req, res) => {
  try {
    const { login, password } = req.body;
    const id = uuid();

    const { rows: [result] } = await dbClient.query(`
      insert into users (id, login, password)
      values ($1, $2, $3)
      returning *
    `, [id, login, password]);

    return res.json({ id: result.id, login: result.login });
  } catch (err) {
    if (err.code = '23505') return res.status(400).json({ err: 'Login exists' });

    res.status(400).json({ err });
  }
});

module.exports = { authRoutes };

