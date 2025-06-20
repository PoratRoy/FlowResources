import React from 'react';
import { Website } from '@/models/types/website';
import { FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import SiteIconImg from '../cardUI/SiteIconImg/SiteIconImg';
import { useDataContext } from '@/context/DataContext';
import { detectLanguage, diractionStyle } from '@/utils/language';
import DeleteWebsiteBtn from '../UI/btn/DeleteWebsiteBtn/DeleteWebsiteBtn';
import WebsiteDescription from '../WebsiteDescription/WebsiteDescription';
import { useActionContext } from '@/context/ActionContext';
import './WebsiteRow.css';

type WebsiteRowProps = {
  website: Website;
};

const WebsiteRow: React.FC<WebsiteRowProps> = ({ website }) => {
  const { categories, deleteWebsite } = useDataContext();
  const { isActionOpen, closeAction } = useActionContext();

  const handleDelete = async () => {
    const deletedId = await deleteWebsite(website.id);
    if (deletedId) closeAction();
  };

  const category = categories.find((cat) => cat.id === website.category);

  return (
    <section className="website-row-container">
      <DeleteWebsiteBtn
        onDelete={handleDelete}
        onClose={closeAction}
        isShown={isActionOpen('deleteWebsite')}
      />
      <div className="website-row">
        <div className="website-row-icon">
          <SiteIconImg website={website} />
        </div>
        <div
          className="website-row-content"
          style={diractionStyle(website)}
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
            <FiExternalLink className="visit-site-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WebsiteRow;
