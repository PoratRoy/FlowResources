'use client';

import React from 'react';
import { Website } from '@/models/types/website';
import { Category } from '@/models/types/category';
import { FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import BannerImg from '@/components/cardUI/BannerImg/BannerImg';
import SiteIconImg from '@/components/cardUI/SiteIconImg/SiteIconImg';
import CardBadges from '@/components/cardUI/CardBadges/CardBadges';
import RateStars from '@/components/UI/RateStars/RateStars';
import { detectLanguage, diractionStyle } from '@/utils/language';
import './ViewWebsitePopup.css';

type ViewWebsitePopupProps = {
  website: Website;
  categories: Category[];
};

const ViewWebsitePopup: React.FC<ViewWebsitePopupProps> = ({ website, categories }) => {
  return (
    <div className="view-website-popup">
      <div className="view-website-banner">
        <BannerImg website={website} />
        <div className="view-website-logo-wrapper">
          <div className="view-website-logo">
            <SiteIconImg website={website} />
          </div>
        </div>
      </div>

      <article
        className="view-website-content"
        style={diractionStyle(website.title)}
        dir={detectLanguage(website.title)}
      >
        <CardBadges categories={categories} website={website} />
        <div className="view-website-header">
          {/* <RateStars rating={website.rating} /> */}
          <h3 className="view-website-title">{website.title}</h3>
        </div>

        <div className="view-website-description">
          <h3>Description</h3>
          <p>{website.description}</p>
        </div>
      </article>

      <div className="view-website-footer">
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
    </div>
  );
};

export default ViewWebsitePopup;
