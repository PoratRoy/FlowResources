import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation/Navigation';
import { WebsitesProvider } from '@/context/WebsitesContext';
import { PopupProvider } from '@/context/PopupContext';
import { CategoryProvider } from '@/context/CategoryContext';
import { ProjectProvider } from '@/context/ProjectContext';
import PopupAddAWebsite from '@/components/PopupAddAWebsite/PopupAddAWebsite';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlowResources',
  description: 'Discover and share valuable web resources',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <AuthProvider>
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
        </AuthProvider>
      </body> 
    </html>
  );
}
