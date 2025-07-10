'use client';

import React, { useRef } from 'react';
import './DeleteWebsiteBtn.css';
import { IoMdClose } from 'react-icons/io';
import { useAccessibility } from '@/hooks/useAccessibility';

type DeleteWebsiteBtnProps = {
  onDelete: () => void;
  onClose: () => void;
  isShown?: boolean;
};

const DeleteWebsiteBtn: React.FC<DeleteWebsiteBtnProps> = ({
  onDelete,
  onClose,
  isShown = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useAccessibility({
    isOpen: isShown,
    navRef: wrapperRef,
    onClose: onClose,
  });

  const handleDelete = (e: React.MouseEvent) => {
    (e.nativeEvent as any).__handled = true;
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      ref={wrapperRef}
      className="delete-website-btn-container"
      style={{
        display: isShown ? 'block' : 'none',
      }}
    >
      <button className="delete-website-btn" onClick={handleDelete}>
        <IoMdClose size={20} />
      </button>
    </div>
  );
};

export default DeleteWebsiteBtn;
