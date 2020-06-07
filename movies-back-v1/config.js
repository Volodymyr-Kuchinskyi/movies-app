const config = {
  db: {
    user: 'movies',
    database: 'movies',
    password: '23232323',
    port: 5432,
    host: 'db'
  },
  tmdb: {
    apiToken: process.env.TMDB_API_TOKEN
  }
};

module.exports = { config };
