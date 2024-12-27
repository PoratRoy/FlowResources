'use client';

import { Website } from '@/models/types/website';
import { createContext, useContext, useState, ReactNode } from 'react';

interface WebsitesContextType {
  websites: Website[];
  setWebsites: (websites: Website[]) => void;
  addWebsite: (currentWebsites: Website[], newWebsite: Omit<Website, 'id'>) => Website[];
  removeWebsite: (currentWebsites: Website[], websiteId: string) => Website[];
  getAllWebsites: (currentWebsites: Website[], category?: string) => Website[];
}

export const WebsitesContext = createContext<WebsitesContextType | undefined>(undefined);

export function useWebsitesContext() {
  const context = useContext(WebsitesContext);
  if (context === undefined) {
    throw new Error('useWebsitesContext must be used within a WebsitesProvider');
  }
  return context;
}

export function WebsitesProvider({ children }: { children: ReactNode }) {
  const [websites, setWebsites] = useState<Website[]>([]);

  const addWebsite = (currentWebsites: Website[], newWebsite: Omit<Website, 'id'>): Website[] => {
    const websiteWithId: Website = {
      ...newWebsite,
      id: crypto.randomUUID(),
    };
    return [...currentWebsites, websiteWithId];
  };

  const removeWebsite = (currentWebsites: Website[], websiteId: string): Website[] => {
    return currentWebsites.filter((website) => website.id !== websiteId);
  };

  const getAllWebsites = (currentWebsites: Website[], category?: string): Website[] => {
    if (!category || category.toLowerCase() === 'all') {
      return currentWebsites;
    }
    return currentWebsites.filter(
      (website) => website.category.toLowerCase() === category.toLowerCase()
    );
  };

  return (
    <WebsitesContext.Provider
      value={{ websites, setWebsites, addWebsite, removeWebsite, getAllWebsites }}
    >
      {children}
    </WebsitesContext.Provider>
  );
}
