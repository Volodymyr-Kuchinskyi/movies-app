const express = require('express');

const parseRoutes = express.Router();

const { dbClient } = require('../db');

parseRoutes.post('/login', async (req, res) => {
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

module.exports = { parseRoutes };

