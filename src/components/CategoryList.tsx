import styles from './CategoryList.module.css';
import Image from 'next/image';

const categories = [
  { name: 'Ngoại ngữ', icon: '/globe.svg' },
  { name: 'Lập trình', icon: '/window.svg' },
  { name: 'Kỹ năng mềm', icon: '/file.svg' },
  { name: 'Tài liệu', icon: '/next.svg' },
  { name: 'Luyện thi', icon: '/vercel.svg' },
  { name: 'Thiếu nhi', icon: '/favicon.ico' },
];

export default function CategoryList() {
  return (
    <section className={styles.categories}>
      {categories.map((cat) => (
        <div key={cat.name} className={styles.card}>
          <Image src={cat.icon} alt={cat.name} className={styles.icon} width={48} height={48} />
          <span className={styles.name}>{cat.name}</span>
        </div>
      ))}
    </section>
  );
} 