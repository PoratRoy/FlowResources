import WebsiteCard from '../WebsiteCard/WebsiteCard';
import { Website } from '@/models/types/website';
import './WebsiteGrid.css';

type WebsiteGridProps = {
  websites: Website[];
};

const WebsiteGrid: React.FC<WebsiteGridProps> = ({ websites }) => {
  return (
    <div className="website-grid">
      {websites.map((website: Website, index: number) => (
        <WebsiteCard key={website?.id || index} website={website} />
      ))}
    </div>
  );
};

export default WebsiteGrid;
