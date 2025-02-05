import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';
import './Popup.css';

type PopupProps = {
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg';
    showCloseButton?: boolean;
}

const Popup: React.FC<PopupProps> = ({ 
    isOpen, 
    onClose, 
    children, 
    size = 'md',
    showCloseButton = true 
}) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="popup-overlay" onClick={onClose} />
            <div className={`popup-container ${isOpen ? 'popup-open' : ''} ${size}`}>
                {showCloseButton ? (
                    <button className="popup-close" onClick={onClose}>
                        <IoClose size={24} />
                    </button>
                ) : null}
                {children}
            </div>
        </>
    );
};

export default Popup;
