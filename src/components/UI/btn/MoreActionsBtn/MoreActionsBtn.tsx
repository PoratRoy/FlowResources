import { useState, useRef } from 'react';
import './MoreActionsBtn.css';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface MoreActionsBtnProps {
  options: Array<{
    label: React.JSX.Element;
    onClick: () => void;
  }>;
}

export default function MoreActionsBtn({ options }: MoreActionsBtnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

//TODO: click outside