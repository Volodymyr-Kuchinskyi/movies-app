import React from 'react';
import { Layout } from 'antd';
import './App.css';

import { Authorize } from './components/Authorize/Authorize';

import { Sider } from './components/Sider';
import { Header } from './components/Header';
import { Content } from './components/Content/Content';
import { Footer } from './components/Footer';

import { moviesApi } from './api/movies';

export interface Movie {
  movieId: string;
  title: string;
  genres: string;
  imageUrl: string;
  description: string;
  avgRating: number;
  rating: number | null;
}

interface AppState {
  userId: string | null;
  login: string | null;
  page: 'movies' | 'saved-movies';
  movies: Movie[];
}

class App extends React.Component {
  state: AppState = {
    userId: localStorage.getItem('userId'),
    login: localStorage.getItem('login'),
    page: 'movies',
    movies: [],
  };

  onLoginSubmit = async (values: any) => {
    const data = await moviesApi.login(values);
    this.setState({ userId: data.id, login: data.login });
    localStorage.setItem('userId', data.id);
    localStorage.setItem('login', data.login);
  };

  onRegisterSubmit = async (values: any) => {
    const data = await moviesApi.register(values);
    this.setState({ userId: data.id, login: data.login });
    localStorage.setItem('userId', data.id);
    localStorage.setItem('login', data.login);
  };

  onLogOut = () => {
    this.setState({ userId: null, login: null });
    localStorage.removeItem('userId');
    localStorage.removeItem('login');
  };

  onMenuClick = (page: string) => {
    this.setState({ page });
  };

  onRateChange = async (movieId: string, rating: number) => {
    const { movies, userId } = this.state;

    if (userId) {
      await moviesApi.rateMovie(userId, movieId, rating);
      this.setState({
        movies: movies.map((m) => {
          if (m.movieId === movieId) m.rating = rating;
          return m;
        }),
      });
    }
  };

  async componentDidMount() {
    if (this.state.userId) {
      const movies = await moviesApi.getMovies(this.state.userId);

      this.setState({ movies });
    }
  }

  render() {
    const { userId, login, page, movies } = this.state;

    return userId ? (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider onLogOut={this.onLogOut} onMenuClick={this.onMenuClick} />
        <Layout className="site-layout">
          <Header login={login} />
          <Content page={page} movies={movies} onRateChange={this.onRateChange} />
          <Footer />
        </Layout>
      </Layout>
    ) : (
      <Authorize onLoginSubmit={this.onLoginSubmit} onRegisterSubmit={this.onRegisterSubmit} />
    );
  }
}

export default App;
