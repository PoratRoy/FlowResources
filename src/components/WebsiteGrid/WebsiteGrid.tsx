"use client";

import { useWebsitesContext, WebsitesContext } from "@/context/WebsitesContext";
import WebsiteCard from "../WebsiteCard/WebsiteCard";
import "./WebsiteGrid.css";
import { Website } from "@/models/types/website";
import { useContext } from "react";

const WebsiteGrid: React.FC = () => {
  const { websites } = useWebsitesContext();

  return (
    <div className="website-grid">
      {websites.map((website: Website) => (
        <WebsiteCard key={website.id} website={website} />
      ))}
    </div>
  );
}

export default WebsiteGrid;
