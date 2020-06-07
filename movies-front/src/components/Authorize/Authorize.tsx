import React from 'react';
import { Tabs, Row, Col } from 'antd';

import { Login } from './Login';
import { Register } from './Register';

interface AuthorizeProps {
  onLoginSubmit: (values: any) => void;
  onRegisterSubmit: (values: any) => void;
}

export const Authorize: React.FC<AuthorizeProps> = ({ onLoginSubmit, onRegisterSubmit }) => {
  return (
    <Row>
      <Col span="6" offset="8" style={{ marginTop: '30vh' }}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Login" key="1">
            <Login onLoginSubmit={onLoginSubmit} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Register" key="2">
            <Register onRegisterSubmit={onRegisterSubmit} />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};
