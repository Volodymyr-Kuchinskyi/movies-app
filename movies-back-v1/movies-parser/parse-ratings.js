const csv = require('csv-parser');
const fs = require('fs');

const parseRatings = async (dbClient) => {
  const result = [];

  fs.createReadStream('./movies-parser/movies-db/ratings.csv')
    .pipe(csv())
    .on('data', (data) => {
      result.push({
        userId: data.userId,
        movieId: data.movieId,
        rating: Number(data.rating)
      });
    })
    .on('end', async () => {
      try {
        await dbClient.query(
          `
          INSERT INTO ratings (user_id, movie_id, rating)
          select user_id, movie_id, rating from unnest(
              $1::text[],
              $2::text[],
              $3::float[]
            ) as s(user_id, movie_id, rating)
          ON CONFLICT DO NOTHING
          `,
          [
            result.map(u => u.userId),
            result.map(u => u.movieId),
            result.map(u => u.rating)
          ]
        );
      } catch (err) {
        console.log({ err });
      }
    });
};

module.exports = { parseRatings };
