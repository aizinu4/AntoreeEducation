import React from 'react';
import styles from './PriceFilter.module.css';

export type PriceRange = '<500K' | '500K-1M' | '>1M';

interface PriceFilterProps {
  value: PriceRange[];
  onChange: (value: PriceRange[]) => void;
}

const options = [
  { label: '<500K', value: '<500K' },
  { label: '500K–1 triệu', value: '500K-1M' },
  { label: '>1 triệu', value: '>1M' },
];

const PriceFilter: React.FC<PriceFilterProps> = ({ value, onChange }) => {
  const handleChange = (checked: boolean, val: PriceRange) => {
    if (checked) {
      onChange([...value, val]);
    } else {
      onChange(value.filter(v => v !== val));
    }
  };
  return (
    <div className={styles.wrapper}>
      {options.map(opt => (
        <label key={opt.value} className={styles.option}>
          <input
            type="checkbox"
            name="price"
            value={opt.value}
            checked={value.includes(opt.value as PriceRange)}
            onChange={e => handleChange(e.target.checked, opt.value as PriceRange)}
          />
          <span className={styles.label}>{opt.label}</span>
        </label>
      ))}
    </div>
  );
};

export default PriceFilter; 