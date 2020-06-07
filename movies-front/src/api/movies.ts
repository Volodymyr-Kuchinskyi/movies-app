import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

const register = async (values: any) => {
  const { data } = await api.post('/register', values);

  return data;
};

const login = async (values: any) => {
  const { data } = await api.post('/login', values);

  return data;
};

const getMovies = async (userId: string) => {
  const { data } = await api.get('/movies', {
    headers: { 'user-id': userId },
  });

  return data.movies;
};

const rateMovie = async (userId: string, movieId: string, rating: number) => {
  console.log({ userId, movieId, rating });
  const { data } = await api.post(
    `/movies/${movieId}/ratings`,
    { rating },
    { headers: { 'user-id': userId } }
  );

  return data;
};

export const moviesApi = {
  register,
  login,
  getMovies,
  rateMovie,
};
