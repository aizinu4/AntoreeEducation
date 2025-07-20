'use client';

import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import styles from './ProductCard.module.css';
import Image from 'next/image';
import { saveProductView } from '../goiyAI/mockAPI';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
  onViewDetail: () => void;
}

const formatPrice = (price: number) =>
  price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  image, 
  shortDescription, 
  onViewDetail 
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      // We need the full product object, so we'll create a minimal one
      const product = { id, name, price, image, shortDescription, longDescription: '', rating: 0 };
      addToFavorites(product);
    }
  };

  const handleViewDetail = () => {
    // Lưu lịch sử xem sản phẩm khi người dùng xem chi tiết
    saveProductView(id);
    onViewDetail();
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={image} alt={name} width={200} height={120} />
        <button 
          className={`${styles.favoriteButton} ${isFavorite(id) ? styles.favorited : ''}`}
          onClick={handleFavoriteToggle}
          aria-label={isFavorite(id) ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          {isFavorite(id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{formatPrice(price)}</p>
        <p className={styles.shortDescription}>{shortDescription}</p>
        <button className={styles.detailBtn} onClick={handleViewDetail}>
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 