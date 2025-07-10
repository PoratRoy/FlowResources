import React from 'react';
import './CardContent.css';
import CardCategory from '../CardCategory/CardCategory';
import { detectLanguage, diractionStyle } from '@/utils/language';
import { Website } from '@/models/types/website';
import { Category } from '@/models/types/category';
import WebsiteDescription from '@/components/WebsiteDescription/WebsiteDescription';
import { FaStar } from 'react-icons/fa';

type CardContentProps = {
  categories: Category[];
  website: Website;
};

const CardContent: React.FC<CardContentProps> = ({ categories, website }) => {
  return (
    <article
      className="website-card-content"
      style={diractionStyle(website)}
      dir={detectLanguage(website.title)}
    >
      <div className="website-card-header">
        <CardCategory categories={categories} website={website} />
        <div className="website-card-tags">
          {website.pricing && (
            <span className={`website-pricing ${website.pricing}`}>
              {website.pricing === 'free' ? 'Free' : 'Paid'}
            </span>
          )}
          {website.websiteType && (
            <span className="website-type">
              {website.websiteType.charAt(0).toUpperCase() + website.websiteType.slice(1)}
            </span>
          )}
        </div>
      </div>
      <h3 className="website-card-title">{website.title}</h3>
      {website.rating && (
        <div className="website-rating">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <FaStar
                key={index}
                className="rating-star"
                color={ratingValue <= website.rating ? "#ffc107" : "#e4e5e9"}
                size={14}
              />
            );
          })}
          <span className="rating-value">{website.rating.toFixed(1)}</span>
        </div>
      )}
      <WebsiteDescription website={website} flex="column" />
    </article>
  );
};

export default CardContent;
