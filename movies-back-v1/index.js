const express = require('express');
const app = express();

const { dbClient } = require('./db');
const { authRoutes } = require('./auth/router');
const { authMiddleware } = require('./auth/middleware');
const { movieRoutes } = require('./movies/router');

app.use(express.urlencoded());
app.use(express.json());
app.use('/api', authRoutes);
app.use(authMiddleware);
app.use('/api', movieRoutes);

(async () => {
  await dbClient.connect();

  app.listen(3001, () => {
    console.log('Server listens on port 3001...');
  });
})();
