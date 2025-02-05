import React from 'react';
import './CardCategory.css';
import { Category } from '@/models/types/category';
import { Website } from '@/models/types/website';

type CardCategoryProps = {
  categories: Category[];
  website: Website;
};

const CardCategory: React.FC<CardCategoryProps> = ({ categories, website }) => {
  return (
    <div className="website-card-category-absolute">
      <span className="website-card-category">
        {categories.find((cat) => cat.id == website.category)?.title || ''}
      </span>
    </div>
  );
};

export default CardCategory;
