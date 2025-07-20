'use client';

import React from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import ProductList from '../../components/ProductList';
import styles from './favorites.module.css';
import Link from 'next/link';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Sản phẩm yêu thích</h1>
        <p className={styles.subtitle}>
          {favorites.length === 0 
            ? 'Bạn chưa có sản phẩm yêu thích nào'
            : `Bạn có ${favorites.length} sản phẩm yêu thích`
          }
        </p>
      </div>
      
      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🤍</div>
          <h2>Chưa có sản phẩm yêu thích</h2>
          <p>Hãy khám phá các sản phẩm và thêm vào danh sách yêu thích của bạn</p>
          <Link href="/" className={styles.browseButton}>
            Khám phá sản phẩm
          </Link>
        </div>
      ) : (
        <ProductList products={favorites} />
      )}
    </div>
  );
};

export default FavoritesPage; 