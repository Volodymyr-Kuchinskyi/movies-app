import React from 'react';
import { Layout, Button, Row, Col } from 'antd';

export const Header: React.FC = () => (
  <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
    <Row>
      <Col span={2} offset={22}>
        <Button type="primary" size="large">
          Sign Up
        </Button>
      </Col>
    </Row>
  </Layout.Header>
);
