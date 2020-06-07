import React from 'react';
import { Layout } from 'antd';
import './App.css';

import { Authorize } from './components/Authorize/Authorize';

import { Sider } from './components/Sider';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Footer } from './components/Footer';

import { moviesApi } from './api/movies';

class App extends React.Component {
  state = {
    userId: localStorage.getItem('userId'),
    login: localStorage.getItem('login'),
    page: 'movies',
  };

  onLoginSubmit = async (values: any) => {
    const { data } = await moviesApi.post('/login', values);
    this.setState({ userId: data.id, login: data.login });
    localStorage.setItem('userId', data.id);
    localStorage.setItem('login', data.login);
  };

  onRegisterSubmit = async (values: any) => {
    const { data } = await moviesApi.post('/register', values);
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

  render() {
    const { userId, login, page } = this.state;

    return userId ? (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider onLogOut={this.onLogOut} onMenuClick={this.onMenuClick} />
        <Layout className="site-layout">
          <Header login={login} />
          <Content page={page} />
          <Footer />
        </Layout>
      </Layout>
    ) : (
      <Authorize onLoginSubmit={this.onLoginSubmit} onRegisterSubmit={this.onRegisterSubmit} />
    );
  }
}

export default App;
