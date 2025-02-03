'use client';

import { Website } from '@/models/types/website';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createWebsite, fetchWebsites } from '@/lib/database';

interface WebsitesContextType {
  websites: Website[];
  setWebsites: (websites: Website[]) => void;
  addWebsite: (currentWebsites: Website[], newWebsite: Omit<Website, 'id'>) => Promise<Website[]>;
  removeWebsite: (currentWebsites: Website[], websiteId: string) => Website[];
  getAllWebsites: () => Website[];
  getWebsitesByCategory: (category: string) => Website[];
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadWebsites = async () => {
      setIsLoading(true);
      const websitesData = await fetchWebsites();
      setWebsites(websitesData);
      setIsLoading(false);
    };

    loadWebsites();
  }, []);

  const addWebsite = async (currentWebsites: Website[], newWebsite: Omit<Website, 'id'>): Promise<Website[]> => {
    const createdWebsite = await createWebsite(newWebsite, "");
    // if (createdWebsite) {
    //   return [...currentWebsites, createdWebsite];
    // }
    return currentWebsites;
  };

  const removeWebsite = (currentWebsites: Website[], websiteId: string): Website[] => {
    return currentWebsites.filter((website) => website.id !== websiteId);
  };

  const getAllWebsites = (): Website[] => {
    return websites;
  };

  const getWebsitesByCategory = (category: string): Website[] => {
    return websites.filter((website) => website.category === category);
  };

  return (
    <WebsitesContext.Provider
      value={{
        websites,
        setWebsites,
        addWebsite,
        removeWebsite,
        getAllWebsites,
        getWebsitesByCategory,
        isLoading,
      }}
    >
      {children}
    </WebsitesContext.Provider>
  );
}
