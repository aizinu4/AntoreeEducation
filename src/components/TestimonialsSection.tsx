import styles from './TestimonialsSection.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Nguyễn Văn A',
    avatar: '/vercel.svg',
    rating: 5,
    quote: 'Khoá học rất chất lượng, giảng viên tận tâm, mình đã đạt IELTS 7.5 sau 3 tháng!'
  },
  {
    name: 'Trần Thị B',
    avatar: '/globe.svg',
    rating: 4,
    quote: 'Giao diện dễ dùng, gợi ý AI rất thông minh, tiết kiệm thời gian tìm kiếm.'
  },
  {
    name: 'Lê Minh C',
    avatar: '/file.svg',
    rating: 5,
    quote: 'Tài liệu đa dạng, cộng đồng học tập sôi động, mình rất hài lòng.'
  },
  {
    name: 'Phạm Thảo D',
    avatar: '/window.svg',
    rating: 4,
    quote: 'Hỗ trợ nhanh, nhiều ưu đãi hấp dẫn, sẽ giới thiệu bạn bè!'
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, []);
  const t = testimonials[index];
  return (
    <section className={styles.testimonials}>
      <h3 className={styles.heading}>Học viên nói gì về Antoree.Edu?</h3>
      <div className={styles.card}>
        <Image src={t.avatar} alt={t.name} width={60} height={60} />
        <div className={styles.info}>
          <div className={styles.name}>{t.name}</div>
          <div className={styles.rating}>{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</div>
          <blockquote className={styles.quote}>“{t.quote}”</blockquote>
        </div>
      </div>
      <div className={styles.dots}>
        {testimonials.map((_, i) => (
          <span key={i} className={i === index ? styles.dotActive : styles.dot} onClick={() => setIndex(i)} />
        ))}
      </div>
    </section>
  );
} 