import React from 'react';
import { Layout } from 'antd';

import { Movies } from './Movies';
import { Movie } from '../../App';

interface ContentProps {
  page: string;
  movies: Movie[];
  onRateChange: (movieId: string, rating: number) => void;
}

export const Content: React.FC<ContentProps> = ({ page, movies, onRateChange }) => {
  let content;
  if (page === 'movies') content = <Movies movies={movies} onRateChange={onRateChange} />;
  if (page === 'saved-movies') content = <div>Saved Videos</div>;
  return (
    <Layout.Content style={{ margin: '18px 18px' }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        {content}
      </div>
    </Layout.Content>
  );
};
