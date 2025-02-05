"use client";

import React from 'react'
import "./AddCategoryBtn.css"
import { IoMdAdd } from 'react-icons/io';
import { Popups } from '@/models/enum';
import { usePopupContext } from '@/context/PopupContext';

const AddCategoryBtn: React.FC = () => {
    const { openPopup } = usePopupContext();
    return (
        <div className="selection-add" onClick={() => openPopup(Popups.addCategory)}>
            <IoMdAdd className="plus-icon" />
            Add Category
        </div>
    );
}

export default AddCategoryBtn