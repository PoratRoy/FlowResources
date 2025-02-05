import React from 'react';
import './AddWebsiteBtn.css';

type AddWebsiteBtnProps = {
    onClick: () => void;
};

const AddWebsiteBtn: React.FC<AddWebsiteBtnProps> = ({ onClick }) => {
  return (
    <button className="add-button-website" onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        className="plus-icon"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      Add Website
    </button>
  );
};

export default AddWebsiteBtn;
