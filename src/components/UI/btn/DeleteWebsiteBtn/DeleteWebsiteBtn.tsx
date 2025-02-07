import React, { useEffect, useState } from 'react';
import './DeleteWebsiteBtn.css';
import { IoMdClose } from "react-icons/io";

type DeleteWebsiteBtnProps = {
  onDelete: () => void;
  isShown?: boolean;
};

const DeleteWebsiteBtn: React.FC<DeleteWebsiteBtnProps> = ({ onDelete, isShown = false }) => {
  return (
    <button className="delete-website-btn" onClick={onDelete} style={{ display: isShown ? 'block' : 'none' }}>
      <IoMdClose size={20} />
    </button>
  );
};

export default DeleteWebsiteBtn;
