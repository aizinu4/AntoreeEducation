'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import SmartSearch from './SmartSearch';
import styles from './Header.module.css';

export default function Header() {
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>
              Antoree<span className={styles.dot}>.</span>Edu
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <Link href="/" className={styles.navLink}>
            <span className={styles.navIcon}>🏠</span>
            Trang chủ
          </Link>
          <Link href="/favorites" className={styles.navLink}>
            <span className={styles.navIcon}>♥</span>
            Yêu thích
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}>
              <span className={styles.navIcon}>📚</span>
              Khóa học
              <span className={styles.dropdownArrow}>▼</span>
            </button>
            <div className={styles.dropdownContent}>
              <Link href="/courses/programming" className={styles.dropdownItem}>
                <span className={styles.dropdownIcon}>💻</span>
                Lập trình
              </Link>
              <Link href="/courses/design" className={styles.dropdownItem}>
                <span className={styles.dropdownIcon}>🎨</span>
                Thiết kế
              </Link>
              <Link href="/courses/marketing" className={styles.dropdownItem}>
                <span className={styles.dropdownIcon}>📈</span>
                Marketing
              </Link>
              <Link href="/courses/business" className={styles.dropdownItem}>
                <span className={styles.dropdownIcon}>💼</span>
                Kinh doanh
              </Link>
            </div>
          </div>
          <Link href="/about" className={styles.navLink}>
            <span className={styles.navIcon}>ℹ️</span>
            Giới thiệu
          </Link>
          <Link href="/contact" className={styles.navLink}>
            <span className={styles.navIcon}>📞</span>
            Liên hệ
          </Link>
        </nav>

        {/* Smart Search */}
        <div className={styles.searchContainer}>
          <SmartSearch />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}></span>
        </button>

        {/* Mobile Navigation */}
        <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
          <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.navIcon}>🏠</span>
            Trang chủ
          </Link>
          <Link href="/favorites" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.navIcon}>♥</span>
            Yêu thích
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>
          <Link href="/courses" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.navIcon}>📚</span>
            Khóa học
          </Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.navIcon}>ℹ️</span>
            Giới thiệu
          </Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.navIcon}>📞</span>
            Liên hệ
          </Link>
        </nav>
      </div>
    </header>
  );
} 