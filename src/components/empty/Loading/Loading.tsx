import React from 'react';
import './Loading.css';

type LoadingProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
};

const Loading = ({ size = 'md', color = 'primary' }: LoadingProps) => {
  return <div className={`spinner ${size} ${color}`} />;
};

export default Loading;
