import { WEBSITES } from "@/models/resources/websites";
import WebsiteCard from "../WebsiteCard/WebsiteCard";
import "./WebsiteGrid.css";
import { Website } from "@/models/types/website";

export default function WebsiteGrid() {
  return (
    <div className="website-grid">
      {WEBSITES.map((website: Website) => (
        <WebsiteCard key={website.id} website={website} />
      ))}
    </div>
  );
}
