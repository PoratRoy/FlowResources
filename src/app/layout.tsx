import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation/Navigation';
import { PopupProvider } from '@/context/PopupContext';
import { DataContextProvider } from '@/context/DataContext';
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
        <DataContextProvider>
          <PopupProvider>
            <Navigation />
            {children}
          </PopupProvider>
        </DataContextProvider>
      </body>
    </html>
  );
}

//TODO: add error toast
