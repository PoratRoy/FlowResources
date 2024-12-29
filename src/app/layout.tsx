import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation/Navigation';
import { WebsitesProvider } from '@/context/WebsitesContext';
import { PopupProvider } from '@/context/PopupContext';
import { CategoryProvider } from '@/context/CategoryContext';
import { ProjectProvider } from '@/context/ProjectContext';
import PopupAddAWebsite from '@/components/PopupAddAWebsite/PopupAddAWebsite';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlowResources',
  description: 'Discover and share valuable web resources',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProjectProvider>
          <CategoryProvider>
            <WebsitesProvider>
              <PopupProvider>
                <Navigation />
                {children}
                <PopupAddAWebsite />
              </PopupProvider>
            </WebsitesProvider>
          </CategoryProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}
