const csv = require('csv-parser');
const fs = require('fs');

const parseMovieLinks = async (dbClient) => {
  const result = [];

  fs.createReadStream('./movies-parser/movies-db/links.csv')
    .pipe(csv())
    .on('data', (data) => {
      result.push({
        movieId: data.movieId,
        imdbId: data.imdbId,
        tmdbId: data.tmdbId
      });
    })
    .on('end', async () => {
      try {
        await dbClient.query(
          `
          INSERT INTO movie_links (movie_id, imdb_id, tmdb_id)
          select movie_id, imdb_id, tmdb_id from unnest(
              $1::text[],
              $2::text[],
              $3::text[]
            ) as s(movie_id, imdb_id, tmdb_id)
          ON CONFLICT DO NOTHING
          `,
          [
            result.map(u => u.movieId),
            result.map(u => u.imdbId),
            result.map(u => u.tmdbId)
          ]
        );
      } catch (err) {
        console.log({ err });
      }
    });
};

module.exports = { parseMovieLinks };
