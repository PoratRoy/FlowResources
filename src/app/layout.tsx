import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation/Navigation';
import { PopupProvider } from '@/context/PopupContext';
import PopupAddWebsite from '@/components/popups/PopupAddWebsite/PopupAddWebsite';
import PopupAddCategory from '@/components/popups/PopupAddCategory/PopupAddCategory';
import { DataContextProvider } from '@/context/DataContext';
import PopupDeleteProject from '@/components/popups/PopupDeleteProject/PopupDeleteProject';
import PopupDeleteCategory from '@/components/popups/PopupDeleteCategory/PopupDeleteCategory';
import './globals.css';
import PopupAddProject from '@/components/popups/PopupAddProject/PopupAddProject';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlowResources',
  description: 'Discover and share valuable web resources',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <DataContextProvider>
          <PopupProvider>
            <Navigation />
            {children}
            <PopupAddWebsite />
            <PopupAddCategory />
            <PopupAddProject />
            <PopupDeleteProject />
            <PopupDeleteCategory />
          </PopupProvider>
        </DataContextProvider>
      </body>
    </html>
  );
}

//TODO: add error toast
