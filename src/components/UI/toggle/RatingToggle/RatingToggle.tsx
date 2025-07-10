'use client';

import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';
import './RatingToggle.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaStar } from 'react-icons/fa';

type RatingToggleProps = {
  setRating: Dispatch<SetStateAction<number>>;
  rating: number;
};

const RatingToggle: React.FC<RatingToggleProps> = ({
  setRating,
  rating,
}) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <FormInputLayout label="Rating" id="rating">
      <div className="rating-toggle">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          
          return (
            <label key={index} className="rating-label">
              <input
                type="radio"
                name="rating"
                className="rating-radio"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#2563eb" : "transparent"}
                stroke={ratingValue <= (hover || rating) ? "transparent" : "#2563eb"}
                strokeWidth={20}
                size={20}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
    </FormInputLayout>
  );
};

export default RatingToggle;
