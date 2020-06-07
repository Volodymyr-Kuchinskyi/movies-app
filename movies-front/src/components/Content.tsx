import React from 'react';
import { Layout } from 'antd';

interface ContentProps {
  page: string;
}

export const Content: React.FC<ContentProps> = ({ page }) => {
  let content;
  if (page === 'movies') content = <div>Videos</div>;
  if (page === 'saved-movies') content = <div>Saved Videos</div>;
  return (
    <Layout.Content style={{ margin: '18px 18px' }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        {content}
      </div>
    </Layout.Content>
  );
};
