const { dbClient } = require('../db');

const authMiddleware = async (req, res, next) => {
  const userId = req.headers['user-id'];

  const { rows: [result] } = await dbClient.query(`
      select id, login from users
      where id = $1
    `, [userId]);

  if (!result) {
    return res.status(401).json({ err: 'Unauthorized' });
  }

  req.user = result;

  next();
};

module.exports = { authMiddleware };
