"use client"

import React, { useRef } from 'react';
import './DeleteWebsiteBtn.css';
import { IoMdClose } from "react-icons/io";
import { useAccessibility } from '@/hooks/useAccessibility';

type DeleteWebsiteBtnProps = {
  onDelete: () => void;
  onClose: () => void;
  isShown?: boolean;
};

const DeleteWebsiteBtn: React.FC<DeleteWebsiteBtnProps> = ({ onDelete, onClose, isShown = false }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useAccessibility({
    isOpen: isShown,
    navRef: wrapperRef,
    onClose: onClose
  });
  return (
    <div ref={wrapperRef} style={{ display: isShown ? 'block' : 'none' }}>
      <button 
        className="delete-website-btn" 
        onClick={onDelete}
      >
        <IoMdClose size={20} />
      </button>
    </div>
  );
};

export default DeleteWebsiteBtn;
