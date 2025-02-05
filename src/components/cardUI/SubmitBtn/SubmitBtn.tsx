import React from 'react';
import './SubmitBtn.css';

type SubmitBtnProps = {
  isLoading: boolean;
  title: string;
};

const SubmitBtn: React.FC<SubmitBtnProps> = ({ isLoading, title }) => {
  return (
    <button type="submit" className="submit-button" disabled={isLoading}>
      {isLoading ? 'Adding...' : title}
    </button>
  );
};

export default SubmitBtn;
