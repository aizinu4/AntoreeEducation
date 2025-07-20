'use client';

import React, { useEffect } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import type { Course } from '../data/products';
import styles from './ProductModal.module.css';
import Image from 'next/image';
import { saveProductView } from '../goiyAI/mockAPI';

interface ProductModalProps {
  product: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatPrice = (price: number) =>
  price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={i} className={styles.star}>★</span>);
  }

  if (hasHalfStar) {
    stars.push(<span key="half" className={styles.halfStar}>☆</span>);
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className={styles.emptyStar}>☆</span>);
  }

  return stars;
};

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // Lưu lịch sử xem khi modal mở
  useEffect(() => {
    if (isOpen && product) {
      saveProductView(product.id);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleFavoriteToggle = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        <div className={styles.modalContent}>
          <div className={styles.imageSection}>
            <Image src={product.image} alt={product.name} width={400} height={250} />
            <button 
              className={`${styles.favoriteButton} ${isFavorite(product.id) ? styles.favorited : ''}`}
              onClick={handleFavoriteToggle}
              aria-label={isFavorite(product.id) ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            >
              {isFavorite(product.id) ? '❤️' : '🤍'}
            </button>
          </div>
          
          <div className={styles.productInfo}>
            <h2 className={styles.productName}>{product.name}</h2>
            
            <div className={styles.ratingSection}>
              <div className={styles.stars}>
                {renderStars(product.rating)}
              </div>
              <span className={styles.ratingText}>{product.rating}/5</span>
            </div>
            
            <div className={styles.priceSection}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
            </div>
            
            <div className={styles.descriptionSection}>
              <h3>Mô tả chi tiết</h3>
              <p className={styles.description}>{product.longDescription}</p>
            </div>
            
            <div className={styles.actions}>
              <button className={styles.buyButton}>
                Mua ngay
              </button>
              <button className={styles.addToCartButton}>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 