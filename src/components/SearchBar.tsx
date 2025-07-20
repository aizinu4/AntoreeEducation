import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Tìm kiếm khoá học, sản phẩm...'}
      />
      <span className={styles.icon}>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#e4572e" strokeWidth="2"/><path d="M20 20L16.65 16.65" stroke="#e4572e" strokeWidth="2" strokeLinecap="round"/></svg>
      </span>
    </div>
  );
};

export default SearchBar; 