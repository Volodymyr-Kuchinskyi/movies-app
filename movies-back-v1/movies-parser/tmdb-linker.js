const async = require('async');

const { tmdbClient } = require('../tmdb/client');

const linkMovies = async (dbClient) => {
  const maxConcurrency = 1;
  const { rows: links } = await dbClient.query('select * from movie_links');

  await async.eachLimit(
    links,
    maxConcurrency,
    async link => {
      try {
        const tmdbMovie = await tmdbClient.getMovie(link.tmdb_id);
        await dbClient.query(`
          update movies set image_url = $1, description = $2
          where movie_id = $3
          `,
          [tmdbMovie.poster_path, tmdbMovie.overview, link.movie_id]
        );
      } catch (err) {
        console.log({ err });
      }

    },
  );
};

module.exports = { linkMovies };
