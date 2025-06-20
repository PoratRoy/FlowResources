'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import PopupModal from '@/components/UI/PopupModal/PopupModal';
import { PopupSize } from '@/models/types/ui';

interface PopupContextType {
  openPopup: (size: PopupSize, content: React.ReactNode) => void;
  closePopup: () => void;
  isOpen: boolean;
  currentPopup: {
    content: React.ReactNode;
    size: PopupSize;
  };
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPopup, setCurrentPopup] = useState<{
    content: React.ReactNode;
    size: PopupSize;
  }>({
    content: null,
    size: 'M',
  });

  const openPopup = (size: PopupSize, content: React.ReactNode) => {
    setCurrentPopup({ content, size });
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const value: PopupContextType = {
    openPopup,
    closePopup,
    isOpen,
    currentPopup,
  };

  return (
    <PopupContext.Provider value={value}>
      {children}
      <PopupModal isOpen={isOpen} onClose={closePopup} size={currentPopup.size}>
        {currentPopup.content}
      </PopupModal>
    </PopupContext.Provider>
  );
};
