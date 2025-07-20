import React from 'react';
import { Course } from '../data/products';
import styles from './SuggestionModal.module.css';
import ProductCard from './ProductCard';

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Course[];
  reason: string;
  isLoading: boolean;
}

const SuggestionModal: React.FC<SuggestionModalProps> = ({ isOpen, onClose, products, reason, isLoading }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <h2 className={styles.heading}>Gợi ý AI</h2>
        {isLoading ? (
          <div className={styles.loading}>Đang lấy gợi ý...</div>
        ) : (
          <>
            <div className={styles.reason}>{reason}</div>
            <div className={styles.products}>
              {products.length === 0 ? (
                <div className={styles.noResult}>Không có sản phẩm phù hợp.</div>
              ) : (
                products.map(product => (
                  <ProductCard key={product.id} {...product} onViewDetail={() => {}} />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuggestionModal; 