"use client";
import styles from './NewsletterPopup.module.css';
import { useState } from 'react';

export default function NewsletterPopup() {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  if (!open) return null;
  return (
    <div className={styles.popup}>
      <button className={styles.close} onClick={() => setOpen(false)}>×</button>
      {submitted ? (
        <div className={styles.thankyou}>Cảm ơn bạn đã đăng ký nhận tin!</div>
      ) : (
        <form className={styles.form} onSubmit={e => {e.preventDefault(); setSubmitted(true);}}>
          <div className={styles.title}>Nhận ưu đãi & tài liệu miễn phí</div>
          <input
            className={styles.input}
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button className={styles.cta} type="submit">Đăng ký</button>
        </form>
      )}
    </div>
  );
} 