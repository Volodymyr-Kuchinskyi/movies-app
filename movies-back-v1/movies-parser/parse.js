const { Pool } = require('pg');

const { testConnection } = require('./test-connection');
const { parseMovies } = require('./parse-movies');
const { parseRatings } = require('./parse-ratings');
const { parseMovieLinks } = require('./parse-movie-links');
const { linkMovies } = require('./tmdb-linker');
const { config } = require('../config');

const dbClient = new Pool(config.db);

(async () => {
  // await testConnection(dbClient);
  // await parseMovies(dbClient);
  // await parseRatings(dbClient);
  // await parseMovieLinks(dbClient);
  await linkMovies(dbClient);

  dbClient.end();
})();
