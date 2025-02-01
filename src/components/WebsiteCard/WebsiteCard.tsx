import type { Website } from '@/models/types/website';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import './WebsiteCard.css';
import { useState } from 'react';

type WebsiteCardProps = {
  website: Website;
};

const getDomainFromUrl = (url: string): string => {
  const urlObject = new URL(url);
  return urlObject.hostname;
};

const getFaviconUrl = (url: string, size: number): string => {
  return `https://www.google.com/s2/favicons?domain=${getDomainFromUrl(url)}&sz=${size}`;
};

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <article className="website-card">
      <div className="website-card-category-absolute">
        <span className="website-card-category">{website.category}</span>
      </div>
      <div className="website-card-banner">
        <Image
          src={website.image}
          alt={website.title}
          fill
          className="logo-banner-image"
          unoptimized
          onError={({ currentTarget }) => {
            currentTarget.src = '/icons/website.svg';
          }}
        />
        <div className="website-card-logo-wrapper">
          <div className="website-card-logo">
            <Image
              src={getFaviconUrl(website.url, 256)}
              alt={website.title}
              fill
              className="logo-image"
              unoptimized
              onError={({ currentTarget }) => {
                currentTarget.src = '/icons/website.svg';
              }}
            />
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
          href={website.url}
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
