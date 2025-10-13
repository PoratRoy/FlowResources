import React from 'react';
import './RateStars.css';
import { Icon } from '@/components/UI/Icons/Icons';

type RateStarsProps = {
  rating: number;
};

const RateStars: React.FC<RateStarsProps> = ({ rating }) => {
  return (
    <div className="website-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Icon.star
            key={index}
            className="rating-star"
            color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
            size={14}
          />
        );
      })}
      {/* <span className="rating-value">{rating.toFixed(1)}</span> */}
    </div>
  );
};

export default RateStars;
