import React, { CSSProperties, useState } from 'react';
import './CardContent.css';
import CardCategory from '../CardCategory/CardCategory';
import { detectLanguage } from '@/utils/language';
import { Website } from '@/models/types/website';
import { Category } from '@/models/types/category';

type CardContentProps = {
  categories: Category[];
  website: Website;
};

const CardContent: React.FC<CardContentProps> = ({ categories, website }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  
  const diractionStyle = (): CSSProperties => {
    return detectLanguage(website.title) === 'english'
      ? { direction: 'ltr' }
      : { direction: 'rtl' };
  };

  return (
    <article
      className="website-card-content"
      // style={showMore ? { overflowY: 'scroll' } : {}}
      style={diractionStyle()}
      dir={detectLanguage(website.title)}
    >
      <CardCategory categories={categories} website={website} />
      <h3 className="website-card-title">{website.title}</h3>
      <p className="website-card-description">{website.description}</p>
      {/* {showMore ? null : (
            <div className="show-more-button" onClick={toggleShowMore}>
            show more
            </div>
        )} */}
    </article>
  );
};

export default CardContent;
