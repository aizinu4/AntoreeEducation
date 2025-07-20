'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import styles from './ProductList.module.css';

import type { Course } from '../data/products';

interface ProductListProps {
  products: Course[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const handleViewDetail = (product: Course) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <>
      <div className={styles.products}>
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            onViewDetail={() => handleViewDetail(product)}
          />
        ))}
      </div>
      {visibleCount < products.length && (
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <button onClick={handleShowMore} className={styles.showMoreBtn}>
            Xem thêm
          </button>
        </div>
      )}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProductList; 