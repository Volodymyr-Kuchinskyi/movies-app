const { Client } = require('pg');
const { config } = require('./config');

const client = new Client(config.db);

module.exports = { dbClient: client };
