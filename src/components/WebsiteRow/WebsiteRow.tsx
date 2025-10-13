import React from 'react';
import { Website } from '@/models/types/website';
import Link from 'next/link';
import SiteIconImg from '../cardUI/SiteIconImg/SiteIconImg';
import { useDataContext } from '@/context/DataContext';
import { detectLanguage, diractionStyle } from '@/utils/language';
import WebsiteDescription from '../WebsiteDescription/WebsiteDescription';
import { Icon } from '@/components/UI/Icons/Icons';
import './WebsiteRow.css';
import MoreCardActionsBtn from '../UI/btn/MoreCardActionBtn/MoreCardActionBtn';
import { CardActionsOptions } from '@/models/resources/options';

type WebsiteRowProps = {
  website: Website;
};

const WebsiteRow: React.FC<WebsiteRowProps> = ({ website }) => {
  const { categories } = useDataContext();

  const category = categories.find((cat) => cat.id === website.category);

  return (
    <section className="website-row-container">
      <div className="website-row">
        <MoreCardActionsBtn options={CardActionsOptions} website={website} />
        <div className="website-row-icon">
          <SiteIconImg website={website} />
        </div>
        <div
          className="website-row-content"
          style={diractionStyle(website.title)}
          dir={detectLanguage(website.title)}
        >
          <div className="website-row-header">
            <h3 className="website-row-title">{website.title}</h3>
            {category && <span className="website-row-category">{category.title}</span>}
          </div>
          <WebsiteDescription website={website} />
        </div>
        <div className="website-row-actions">
          <Link
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="website-row-visit-button"
          >
            Visit Site
            <Icon.link className="visit-site-icon" size={22} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WebsiteRow;
