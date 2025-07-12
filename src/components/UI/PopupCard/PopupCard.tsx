'use client';

import React, { useRef } from 'react';
import './PopupCard.css';
import { useAccessibility } from '@/hooks/useAccessibility';
import { PopupSize } from '@/models/types/ui';
import { FiX } from 'react-icons/fi';

interface PopupCardProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size: PopupSize;
  title?: string;
}

const PopupCard: React.FC<PopupCardProps> = ({ isOpen, onClose, children, size, title }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useAccessibility({ isOpen, navRef: cardRef, onClose });

  if (!isOpen) return null;

  return (
    <div className="popup-card-overlay">
      <div className={`popup-card-container size-${size}`} ref={cardRef}>
        {title && (
          <header className="popup-card-header">
            <h2 className="popup-card-title">{title}</h2>
            <button className="popup-card-close" onClick={onClose} aria-label="Close">
              <FiX size={24} />
            </button>
          </header>
        )}
        {!title && (
          <button className="popup-card-close-no-header" onClick={onClose} aria-label="Close">
            <FiX size={24} />
          </button>
        )}
        <div className="popup-card-content">{children}</div>
      </div>
    </div>
  );
};

export default PopupCard;
