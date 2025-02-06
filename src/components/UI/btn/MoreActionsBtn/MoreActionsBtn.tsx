import { useState, useRef } from 'react';
import './MoreActionsBtn.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ActionOption } from '@/models/types/select';
import { usePopupContext } from '@/context/PopupContext';

interface MoreActionsBtnProps {
  options: ActionOption[];
}

const MoreActionsBtn = ({ options }: MoreActionsBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { openPopup } = usePopupContext();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (option: ActionOption) => {
    if (option.open) openPopup(option.open);
    else if (option.onClick) option.onClick();
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
            <button key={index} className="menu-item" onClick={() => handleClick(option)}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoreActionsBtn;
//TODO: click outside
