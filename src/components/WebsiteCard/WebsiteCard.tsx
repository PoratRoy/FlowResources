import type { Website } from '@/models/types/website';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import './WebsiteCard.css';
import { useState } from 'react';
import BannerImg from '../UI/BannerImg/BannerImg';
import SiteIconImg from '../UI/SiteIconImg/SiteIconImg';
import { useDataContext } from '@/context/DataContext';

type WebsiteCardProps = {
  website: Website;
};

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  const { categories } = useDataContext();
  const [showMore, setShowMore] = useState<boolean>(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <article className="website-card">
      <div className="website-card-category-absolute">
        <span className="website-card-category">{categories.find((cat) => cat.id == website.category)?.title || ""}</span>
      </div>
      <div className="website-card-banner">
        <BannerImg website={website} />
        <div className="website-card-logo-wrapper">
          <div className="website-card-logo">
            <SiteIconImg website={website} />
          </div>
        </div>
      </div>
      <div className="website-card-content" style={showMore ? { overflowY: 'scroll' } : {}}>
        <h3 className="website-card-title">{website.title}</h3>
        <p className="website-card-description">{website.description}</p>
        {showMore ? null : (
          <div className="show-more-button" onClick={toggleShowMore}>
            show more
          </div>
        )}
      </div>
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
    </article>
  );
};

export default WebsiteCard;
