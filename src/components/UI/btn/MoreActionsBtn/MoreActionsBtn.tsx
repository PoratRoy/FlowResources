'use client';

import { useState, useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ActionOption } from '@/models/types/select';
import { usePopup } from '@/context/PopupContext';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useDataContext } from '@/context/DataContext';
import { useActionContext } from '@/context/ActionContext';
import './MoreActionsBtn.css';

type MoreActionsBtnProps = {
  options: ActionOption[];
};

const MoreActionsBtn: React.FC<MoreActionsBtnProps> = ({ options }) => {
  const { projects, categories, websites } = useDataContext();
  const [isOpen, setIsOpen] = useState(false);
  const { openPopup } = usePopup();
  const { openAction } = useActionContext();
  const menuRef = useRef<HTMLDivElement>(null);

  const mapdata = {
    project: projects,
    category: categories,
    website: websites,
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useAccessibility({
    isOpen,
    navRef: menuRef,
    onClose: closeMenu,
  });

  const handleClick = (option: ActionOption) => {
    if (option.openPopup)
      openPopup(option.openPopup.size, option.openPopup.elm, option.openPopup.title);
    else if (option.openAction) openAction(option.openAction);
    setIsOpen(false);
  };

  return (
    <div className="more-actions-container" ref={menuRef}>
      <button
        className="more-actions-btn"
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <BsThreeDotsVertical className="three-dots-icon" size={24} />
      </button>

      {isOpen && (
        <div className="more-actions-menu">
          {options.map((option, index) => (
            <button
              key={index}
              className="menu-item"
              onClick={() => handleClick(option)}
              disabled={option.relatedTo ? mapdata[option.relatedTo].length === 0 : false}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoreActionsBtn;
