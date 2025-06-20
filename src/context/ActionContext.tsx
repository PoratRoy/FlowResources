'use client';

import { ActionType } from '@/models/types/actions';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ActionContextType {
  action: ActionType;
  isActionOpen: (type: ActionType | 'any') => boolean;
  openAction: (type: ActionType) => void;
  closeAction: () => void;
}

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const useActionContext = () => {
  const context = useContext(ActionContext);
  if (context === undefined) {
    throw new Error('useActionContext must be used within an ActionProvider');
  }
  return context;
};

export const ActionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [action, setAction] = useState<ActionType>('none');

  const isActionOpen = (type: ActionType | 'any') => {
    if (type === 'any') return action !== 'none';
    return type === action;
  };

  const openAction = (type: ActionType) => {
    setAction(type);
  };

  const closeAction = () => {
    setAction('none');
  };

  const value: ActionContextType = {
    action,
    isActionOpen,
    openAction,
    closeAction,
  };

  return <ActionContext.Provider value={value}>{children}</ActionContext.Provider>;
};
