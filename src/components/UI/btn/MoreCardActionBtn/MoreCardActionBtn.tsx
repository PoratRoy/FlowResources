'use client';

import { useState, useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ActionOption } from '@/models/types/select';
import { usePopup } from '@/context/PopupContext';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useDataContext } from '@/context/DataContext';
import './MoreCardActionBtn.css';
import { Website } from '@/models/types/website';
import PopupUpdateWebsite from '@/components/popups/PopupUpdateWebsite/PopupUpdateWebsite';

type MoreCardActionsBtnProps = {
  options: ActionOption[];
  website: Website;
};

const MoreCardActionsBtn: React.FC<MoreCardActionsBtnProps> = ({ options, website }) => {
  const { projects, categories, websites, deleteWebsite } = useDataContext();
  const [isOpen, setIsOpen] = useState(false);
  const { openPopup } = usePopup();
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

  const handleClick = async (option: ActionOption) => {
    if (option.openAction) {
      switch (option.openAction) {
        case 'updateWebsite':
          openPopup('L', <PopupUpdateWebsite website={website} />, 'Update Website');
          setIsOpen(false);
          break;
        case 'deleteWebsite':
          const deletedId = await deleteWebsite(website.id);
          if (deletedId) setIsOpen(false);
          break;
      }
    }
  };

  return (
    <div className="more-card-actions-container" ref={menuRef}>
      <button
        className="more-card-actions-btn"
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <BsThreeDotsVertical className="three-dots-card-icon" size={24} />
      </button>

      {isOpen && (
        <div className="more-card-actions-menu">
          {options.map((option, index) => (
            <button
              key={index}
              className="more-card-actions-menu-item"
              onClick={async () => handleClick(option)}
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

export default MoreCardActionsBtn;
