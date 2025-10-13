import './OptionsRadioBtn.css';
import { TOption } from '@/models/types/select';
import { Icon } from '@/components/UI/Icons/Icons';

interface OptionsRadioBtnProps {
  options: TOption[];
  selectedOptions: string[];
  onSelect: (value: string) => void;
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
          className={`option-item ${selectedOptions.includes(option.value) ? 'selected' : ''}`}
          onClick={() => onSelect(option.value)}
        >
          <label className="option-label">
            <span className="option-text">{option.label}</span>
          </label>
          <button className="delete-btn" type="button" aria-label={`Delete ${option.value}`}>
            <Icon.delete />
          </button>
        </div>
      ))}
    </div>
  );
};

export default OptionsRadioBtn;
