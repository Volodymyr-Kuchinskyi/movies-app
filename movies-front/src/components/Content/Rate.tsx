import React from 'react';
import { Button } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

interface RateProps {
  rating: number | null;
}

export const Rate: React.FC<RateProps> = ({ rating }) => {
  return <Button type="primary" shape="round" icon={<LikeOutlined />} size="small"></Button>;
};
