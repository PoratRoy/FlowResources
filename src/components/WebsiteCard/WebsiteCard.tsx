import type { Website } from '@/models/types/website';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import './WebsiteCard.css';
import { CSSProperties, useState } from 'react';
import BannerImg from '../UI/BannerImg/BannerImg';
import SiteIconImg from '../UI/SiteIconImg/SiteIconImg';
import { useDataContext } from '@/context/DataContext';
import CardCategory from '../cardUI/CardCategory/CardCategory';

type WebsiteCardProps = {
  website: Website;
};

const detectLanguage = (text: string): 'hebrow' | 'english' => {
  const hebrewRegex = /[\u0590-\u05FF]/;
  const englishRegex = /[a-zA-Z]/;
  if (hebrewRegex.test(text)) {
    return 'hebrow';
  } else if (englishRegex.test(text)) {
    return 'english';
  } else {
    return 'english';
  }
};

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  const { categories } = useDataContext();
  const [showMore, setShowMore] = useState<boolean>(false);

  const diractionStyle = (): CSSProperties => {
    return detectLanguage(website.title) === 'english' ? { direction: 'ltr' } : { direction: 'rtl' }
  }

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="website-card">
      <div className="website-card-banner">
        <BannerImg website={website} />
        <div className="website-card-logo-wrapper">
          <div className="website-card-logo">
            <SiteIconImg website={website} />
          </div>
        </div>
      </div>
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
      <div className="website-card-footer">
        <Link
          href={website.url.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className="visit-site-button"
        >
          Visit Site
          <FiExternalLink className="visit-site-icon" />
        </Link>
      </div>
    </section>
  );
};

export default WebsiteCard;
