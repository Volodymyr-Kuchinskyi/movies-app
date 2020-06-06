import React from 'react';
import { Layout } from 'antd';
import './App.css';

import { Authorize } from './components/Authorize/Authorize';

import { Sider } from './components/Sider';
import { Content } from './components/Content';
import { Footer } from './components/Footer';

type AppProps = {
  isSignedIn: boolean;
};

const App: React.FC<AppProps> = ({ isSignedIn }) =>
  isSignedIn ? (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout className="site-layout">
        <Content />
        <Footer />
      </Layout>
    </Layout>
  ) : (
    <Authorize />
  );

export default App;
