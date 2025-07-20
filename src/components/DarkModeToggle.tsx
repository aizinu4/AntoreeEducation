"use client";
import { useEffect, useState } from 'react';
import styles from './DarkModeToggle.module.css';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
  }, []);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);
  return (
    <button className={styles.toggle} onClick={() => setDark(d => !d)} title={dark ? 'Chuyển sang sáng' : 'Chuyển sang tối'}>
      {dark ? (
        <span className={styles.icon}>🌙</span>
      ) : (
        <span className={styles.icon}>☀️</span>
      )}
    </button>
  );
} 