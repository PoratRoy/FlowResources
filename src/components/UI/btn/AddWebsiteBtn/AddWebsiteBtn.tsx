import React from 'react';
import './AddWebsiteBtn.css';
import { IoAddCircleOutline } from "react-icons/io5";


type AddWebsiteBtnProps = {
  onClick: () => void;
};

const AddWebsiteBtn: React.FC<AddWebsiteBtnProps> = ({ onClick }) => {
  return (
    <button className="add-button-website" onClick={onClick}>
      <IoAddCircleOutline className="plus-icon" size={20} />
      Add Website
    </button>
  );
};

export default AddWebsiteBtn;
