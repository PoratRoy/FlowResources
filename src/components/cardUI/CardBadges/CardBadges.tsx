import React from 'react';
import './CardBadges.css';
import { Category } from '@/models/types/category';
import { Website } from '@/models/types/website';
import { diractionStyle } from '@/utils/language';

type CardBadgesProps = {
  categories: Category[];
  website: Website;
};

const CardBadges: React.FC<CardBadgesProps> = ({ categories, website }) => {
  const categoryTitle = categories.find((cat) => cat.id == website.category)?.title || '';
  
  return (
    <div className="website-card-badges">
      {categoryTitle && (
        <span className="website-badge category" style={diractionStyle(categoryTitle)}>
          {categoryTitle}
        </span>
      )}
      {website.pricing && (
        <span className={`website-badge pricing ${website.pricing}`}>
          {website.pricing === 'free' ? 'Free' : 'Paid'}
        </span>
      )}
      {website.websiteType && (
        <span className="website-badge type">
          {website.websiteType.charAt(0).toUpperCase() + website.websiteType.slice(1)}
        </span>
      )}
    </div>
  );
};

export default CardBadges;
