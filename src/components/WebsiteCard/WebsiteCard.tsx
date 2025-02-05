import type { Website } from '@/models/types/website';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import BannerImg from '../cardUI/BannerImg/BannerImg';
import SiteIconImg from '../cardUI/SiteIconImg/SiteIconImg';
import { useDataContext } from '@/context/DataContext';
import CardContent from '../cardUI/CardContent/CardContent';
import './WebsiteCard.css';

type WebsiteCardProps = {
  website: Website;
};

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  const { categories } = useDataContext();

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
      <CardContent categories={categories} website={website} />
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
