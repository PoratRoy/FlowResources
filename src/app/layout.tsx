import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation/Navigation';
import { PopupProvider } from '@/context/PopupContext';
import PopupAddAWebsite from '@/components/PopupAddAWebsite/PopupAddAWebsite';
import { DataContextProvider } from '@/context/DataContext';
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
          <DataContextProvider>
            <PopupProvider>
              <Navigation />
              {children}
              <PopupAddAWebsite />
            </PopupProvider>
          </DataContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
