'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import PopupCard from '@/components/UI/PopupCard/PopupCard';
import { PopupSize } from '@/models/types/ui';

interface PopupCardContextType {
  openPopupCard: (size: PopupSize, content: React.ReactNode, title?: string) => void;
  closePopupCard: () => void;
  isOpen: boolean;
  currentPopupCard: {
    content: React.ReactNode;
    size: PopupSize;
    title?: string;
  };
}

const PopupCardContext = createContext<PopupCardContextType | undefined>(undefined);

export const usePopupCard = () => {
  const context = useContext(PopupCardContext);
  if (context === undefined) {
    throw new Error('usePopupCard must be used within a PopupCardProvider');
  }
  return context;
};

export const PopupCardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPopupCard, setCurrentPopupCard] = useState<{
    content: React.ReactNode;
    size: PopupSize;
    title?: string;
  }>({
    content: null,
    size: 'M',
    title: '',
  });

  const openPopupCard = (size: PopupSize, content: React.ReactNode, title?: string) => {
    setCurrentPopupCard({ content, size, title });
    setIsOpen(true);
    // Prevent scrolling when popup is open
    document.body.style.overflow = 'hidden';
  };

  const closePopupCard = () => {
    setIsOpen(false);
    // Re-enable scrolling when popup is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <PopupCardContext.Provider
      value={{
        openPopupCard,
        closePopupCard,
        isOpen,
        currentPopupCard,
      }}
    >
      {children}
      <PopupCard
        isOpen={isOpen}
        onClose={closePopupCard}
        size={currentPopupCard.size}
        title={currentPopupCard.title}
      >
        {currentPopupCard.content}
      </PopupCard>
    </PopupCardContext.Provider>
  );
};
