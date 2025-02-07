import { FaTrash } from 'react-icons/fa';
import './OptionsRadioBtn.css';
import { TOption } from '@/models/types/select';

interface OptionsRadioBtnProps {
  options: TOption[];
  selectedOptions: number[];
  onSelect: (value: number) => void;
}

const OptionsRadioBtn: React.FC<OptionsRadioBtnProps> = ({
  options,
  selectedOptions,
  onSelect,
}) => {
  return (
    <div className="options-container">
      {options.map((option) => (
        <div
          key={option.value}
          className="option-item"
          onClick={() => onSelect(option.value)}
          style={{
            backgroundColor: selectedOptions.includes(option.value) ? 'red' : 'transparent',
          }}
        >
          <label className="option-label">
            <span className="option-text">{option.label}</span>
          </label>
          <button className="delete-btn" type="button" aria-label={`Delete ${option.value}`}>
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default OptionsRadioBtn;
