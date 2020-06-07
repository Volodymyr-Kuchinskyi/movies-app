const express = require('express');

const movieRoutes = express.Router();

const { dbClient } = require('../db');

movieRoutes.get('/movies', async (req, res) => {
  try {
    const { rows: movies } = await dbClient.query(`
      with
      processed_ratings as (
        select count(rating) as rank, avg(rating) as avg_rating, movie_id from ratings
        group by movie_id
      )
      select 
          m.movie_id as "movieId",
          m.title,
          m.genres,
          m.image_url as "imageUrl",
          m.description,
          round(p_r.avg_rating::numeric, 2) as "avgRating",
          rated.rating
      from movies as m
      join processed_ratings as p_r on m.movie_id = p_r.movie_id
      left join ratings as rated on rated.user_id = $1 and rated.movie_id = m.movie_id
      where m.image_url is not null
      order by p_r.rank desc, p_r.avg_rating desc
      limit 30
    `, [req.user.id]);

    res.json({ movies });
  } catch (err) {
    console.log({ err });
    res.status(400).json({ err });
  }
});

movieRoutes.post('/movies/:movieId/ratings', async (req, res) => {
  const { rows: [movie] } = await dbClient.query(`
    select movie_id from movies where movie_id = $1
  `, [req.params.movieId]);

  const { rating: rate } = req.body;
  const { rows: [rating] } = await dbClient.query(`
    insert into ratings (user_id, movie_id, rating)
    values ($1, $2, $3)
    on conflict(user_id, movie_id) do
    update set rating = excluded.rating
    returning movie_id as "movieId", rating
  `, [req.user.id, movie.movie_id, rate]);

  res.json({ rating });
});

module.exports = { movieRoutes };

