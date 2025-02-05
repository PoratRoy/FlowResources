"use client";

import { Popups } from "@/models/enum";
import { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextType {
  isOpen: (which: Popups) => boolean;
  openPopup: (which: Popups) => void;
  closePopup: () => void;
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
  const [popup, setPopup] = useState<Popups | null>(null);

  const openPopup = (which: Popups): void => {
    setPopup(which);
  };

  const closePopup = (): void => {
    setPopup(null);
  };

  const isOpen = (which: Popups) => {
    if(popup === null || popup != which) return false;
    return true;
  };

  return (
    <PopupContext.Provider
      value={{
        isOpen,
        openPopup,
        closePopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}
