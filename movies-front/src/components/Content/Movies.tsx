import React from 'react';
import { Row, Col, Card, Rate } from 'antd';
import { Movie } from '../../App';

interface MoviesProps {
  movies: Movie[];
  onRateChange: (movieId: string, rating: number) => void;
}

export const Movies: React.FC<MoviesProps> = ({ movies, onRateChange }) => {
  return (
    <Row>
      {movies.map((m) => (
        <Col key={m.title} span="6">
          <Card title={m.title} style={{ width: '300px', marginBottom: '18px' }}>
            <p>
              <img
                width="250px"
                src={`https://image.tmdb.org/t/p/w300/${m.imageUrl}`}
                alt="movie"
              />
            </p>

            <p className="ellipsis">{m.description}</p>
            <p style={{ fontSize: '14px', color: 'gray', fontWeight: 'bold' }}>
              {m.genres.split('|').join(', ')}
            </p>

            <Row>
              <Col span="14">
                <Rate
                  allowHalf
                  onChange={(value) => onRateChange(m.movieId, value)}
                  value={m.avgRating}
                />
              </Col>
              <Col span="8" offset="2" style={{ marginTop: '6px' }}>
                {m.rating && `Rated: ${m.rating}`}
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
