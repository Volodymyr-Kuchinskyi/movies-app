const axios = require('axios');
const { config } = require('../config');

const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 3000,
});

const getMovie = async (movieId) => {
  const response = await tmdbClient.get(
    `/movie/${movieId}?api_key=${config.tmdb.apiToken}`
  );

  return response.data;
};

module.exports = {
  tmdbClient: {
    getMovie
  }
};
