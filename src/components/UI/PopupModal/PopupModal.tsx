'use client';

import React, { useRef } from 'react';
import './PopupModal.css';
import { useAccessibility } from '@/hooks/useAccessibility';
import { PopupSize } from '@/models/types/ui';

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size: PopupSize;
  title?: string;
}

const PopupModal: React.FC<PopupModalProps> = ({ isOpen, onClose, children, size, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useAccessibility({ isOpen, navRef: modalRef, onClose });

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <section className={`modalContainer size${size}`} ref={modalRef}>
        <header className="modalHeader">
          <h2>{title}</h2>
          <button className="closeButton" onClick={onClose} aria-label="סגור">
            ×
          </button>
        </header>
        <div className={`modalContent-size${size}`}>{children}</div>
      </section>
    </div>
  );
};

export default PopupModal;
