import React from 'react';
import './WebsiteDescription.css';
import { Website } from '@/models/types/website';
import { useTooltip } from '@/hooks/useTooltip';
import { detectLanguage } from '@/utils/language';

type WebsiteDescriptionProps = {
  website: Website;
  flex?: 'row' | 'column';
};

const WebsiteDescription = ({ website, flex = 'row' }: WebsiteDescriptionProps) => {
  const { showTooltip, tooltipHandlers } = useTooltip(1000);
  return (
    <div
      className="website-row-description-container"
      onMouseEnter={tooltipHandlers.onMouseEnter}
      onMouseLeave={tooltipHandlers.onMouseLeave}
      aria-label={website.description}
    >
      <p className={`website-row-description ${flex}`}>{website.description}</p>
      {showTooltip && (
        <div className="website-row-tooltip" dir={detectLanguage(website.title)}>
          {website.description}
        </div>
      )}
    </div>
  );
};

export default WebsiteDescription;
