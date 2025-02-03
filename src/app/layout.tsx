import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation/Navigation';
import { PopupProvider } from '@/context/PopupContext';
import { CategoryProvider } from '@/context/CategoryContext';
import PopupAddAWebsite from '@/components/PopupAddAWebsite/PopupAddAWebsite';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import { DataContextProvider } from '@/context/DataContext';

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
          <DataContextProvider>
            <CategoryProvider>
              <PopupProvider>
                <Navigation />
                {children}
                <PopupAddAWebsite />
              </PopupProvider>
            </CategoryProvider>
          </DataContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
