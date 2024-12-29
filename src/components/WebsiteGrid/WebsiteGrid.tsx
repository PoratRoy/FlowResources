"use client";

import { useWebsitesContext } from "@/context/WebsitesContext";
import WebsiteCard from "../WebsiteCard/WebsiteCard";
import { useState, useEffect } from "react";
import { Website } from "@/models/types/website";
import { useSearchParams } from "next/navigation";
import "./WebsiteGrid.css";

const WebsiteGrid: React.FC = () => {
  const { getAllWebsites, getWebsitesByCategory } = useWebsitesContext();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredWebsites =
    category === "all" ? getAllWebsites() : getWebsitesByCategory(category);

  return (
    <div className="website-grid">
      {filteredWebsites.map((website: Website) => (
        <WebsiteCard key={website.id} website={website} />
      ))}
    </div>
  );
}

export default WebsiteGrid;
