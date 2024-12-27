import type { Website } from "@/models/types/website";
import Image from "next/image";
import Link from "next/link";
import "./WebsiteCard.css";

type WebsiteCardProps = {
  website: Website;
};

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  return (
    <article className="website-card">
      <Link
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className="website-card-image"
      >
        <Image src={website.image} alt={website.title} fill className="image" />
      </Link>
      <div className="website-card-content">
        <h3 className="website-card-title">{website.title}</h3>
        <p className="website-card-description">{website.description}</p>
        <span className="website-card-category">{website.category}</span>
      </div>
    </article>
  );
};

export default WebsiteCard;
