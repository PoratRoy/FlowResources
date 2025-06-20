import React from 'react';
import './CardContent.css';
import CardCategory from '../CardCategory/CardCategory';
import { detectLanguage, diractionStyle } from '@/utils/language';
import { Website } from '@/models/types/website';
import { Category } from '@/models/types/category';
import WebsiteDescription from '@/components/WebsiteDescription/WebsiteDescription';

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
      <CardCategory categories={categories} website={website} />
      <h3 className="website-card-title">{website.title}</h3>
      <WebsiteDescription website={website} flex="column" />
    </article>
  );
};

export default CardContent;
