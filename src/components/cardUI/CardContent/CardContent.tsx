import React from 'react';
import './CardContent.css';
import { detectLanguage, diractionStyle } from '@/utils/language';
import { Website } from '@/models/types/website';
import { Category } from '@/models/types/category';
import CardBadges from '../CardBadges/CardBadges';
import { usePopupCard } from '@/context/PopupCardContext';
import ViewWebsitePopup from '@/components/popups/ViewWebsitePopup/ViewWebsitePopup';

type CardContentProps = {
  categories: Category[];
  website: Website;
};

const CardContent: React.FC<CardContentProps> = ({ categories, website }) => {
  const { openPopupCard } = usePopupCard();

  const handleViewMore = () => {
    openPopupCard('L', <ViewWebsitePopup website={website} categories={categories} />);
  };

  return (
    <article
      className="website-card-content"
      style={diractionStyle(website.title)}
      dir={detectLanguage(website.title)}
    >
      <h3 className="website-card-title">{website.title}</h3>
      <CardBadges categories={categories} website={website} />
      <button className="website-card-view-more" onClick={handleViewMore}>
        view more
      </button>
    </article>
  );
};

export default CardContent;
