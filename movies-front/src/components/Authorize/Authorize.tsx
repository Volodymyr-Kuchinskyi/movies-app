import React from 'react';
import { Tabs, Row, Col } from 'antd';

import { Login } from './Login';
import { Register } from './Register';


export const Authorize: React.FC = () => {
  return (
    <Row>
      <Col span="6" offset="8" style={{ marginTop: '30vh' }}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Login" key="1">
            <Login />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Register" key="2">
            <Register />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};
