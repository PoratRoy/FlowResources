import React from 'react';
import './CardContent.css';
import { detectLanguage, diractionStyle } from '@/utils/language';
import { Website } from '@/models/types/website';
import { Category } from '@/models/types/category';
import CardBadges from '../CardBadges/CardBadges';
import RateStars from '@/components/UI/RateStars/RateStars';

type CardContentProps = {
  categories: Category[];
  website: Website;
};

const CardContent: React.FC<CardContentProps> = ({ categories, website }) => {
  return (
    <article
      className="website-card-content"
      style={diractionStyle(website.title)}
      dir={detectLanguage(website.title)}
    >
      <RateStars rating={website.rating} />
      <h3 className="website-card-title">{website.title}</h3>
      <CardBadges categories={categories} website={website} />
      <button className="website-card-view-more">view more</button>
      {/* <WebsiteDescription website={website} flex="column" /> */}
    </article>
  );
};

export default CardContent;
