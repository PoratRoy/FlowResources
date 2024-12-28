"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openPopup: () => void;
  closePopup: () => void;
  togglePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function usePopupContext() {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error("usePopupContext must be used within a PopupProvider");
  }
  return context;
}

export function PopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openPopup = (): void => {
    setIsOpen(true);
  };

  const closePopup = (): void => {
    setIsOpen(false);
  };

  const togglePopup = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <PopupContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openPopup,
        closePopup,
        togglePopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}
