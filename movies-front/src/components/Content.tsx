import React from "react";
import { Layout } from 'antd';

export const Content: React.FC = () => (
  <Layout.Content style={{ margin: '18px 18px' }}>
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      Bill is a cat.
    </div>
  </Layout.Content>
);
