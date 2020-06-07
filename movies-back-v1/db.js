const { Client } = require('pg');

const client = new Client({
  user: 'movies',
  database: 'movies',
  password: '23232323',
  port: 5432,
  host: 'db'
});

module.exports = { dbClient: client };
