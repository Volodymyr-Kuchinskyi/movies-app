const csv = require('csv-parser');
const fs = require('fs');

const parseMovies = async (dbClient) => {
  const result = [];

  fs.createReadStream('./movies-parser/movies-db/movies.csv')
    .pipe(csv())
    .on('data', (data) => {
      result.push({ movieId: data.movieId, title: data.title, genres: data.genres });
    })
    .on('end', async () => {
      try {
        await dbClient.query(
          `
          INSERT INTO movies (movie_id, title, genres)
          select movie_id, title, genres from unnest(
              $1::text[],
              $2::text[],
              $3::text[]
            ) as s(movie_id, title, genres)
          ON CONFLICT DO NOTHING
          `,
          [result.map(u => u.movieId), result.map(u => u.title), result.map(u => u.genres)]
        );
      } catch (err) {
        console.log({ err });
      }
    });
};

module.exports = { parseMovies };
