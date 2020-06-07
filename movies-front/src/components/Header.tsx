import React from 'react';
import { Layout, Row, Col } from 'antd';

interface HeaderProps {
  login: string | null;
}

export const Header: React.FC<HeaderProps> = ({ login }) => (
  <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
    <Row>
      <Col span={2} offset={1} style={{ fontSize: '16px' }}>
        Login: {login}
      </Col>
    </Row>
  </Layout.Header>
);
