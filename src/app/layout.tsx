import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation/Navigation';
import { WebsitesProvider } from '@/context/WebsitesContext';
import { PopupProvider } from "@/context/PopupContext";
import { Popup } from "@/components/Popup/Popup";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlowResources',
  description: 'Discover and share valuable web resources',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebsitesProvider>
          <PopupProvider>
            <Navigation />
            {children}
            <Popup />
          </PopupProvider>
        </WebsitesProvider>
      </body>
    </html>
  );
}
