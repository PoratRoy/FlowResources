import type { Website } from "@/models/types/website";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import "./WebsiteCard.css";

type WebsiteCardProps = {
  website: Website;
};
// http://www.google.com/s2/favicons?domain=www.google.com
const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  return (
    <article className="website-card">
      <div className="website-card-category-absolute">
        <span className="website-card-category">{website.category}</span>
      </div>
      <div className="website-card-banner">
        <div className="website-card-logo-wrapper">
          <div className="website-card-logo">
            <Image 
              src={website.image} 
              alt={website.title} 
              fill 
              className="logo-image"
              unoptimized
              onError={({ currentTarget }) => {
                currentTarget.src = "/icons/website.svg";
              }}
            />
          </div>
        </div>
      </div>
      <div className="website-card-content">
        <h3 className="website-card-title">{website.title}</h3>
        <p className="website-card-description">{website.description}</p>
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
