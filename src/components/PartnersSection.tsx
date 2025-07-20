import styles from './PartnersSection.module.css';
import Image from 'next/image';

const partners = [
  { name: 'ĐH Quốc Gia', logo: '/globe.svg' },
  { name: 'Viettel', logo: '/vercel.svg' },
  { name: 'FPT', logo: '/window.svg' },
  { name: 'Vinschool', logo: '/file.svg' },
  { name: 'British Council', logo: '/next.svg' },
  { name: 'Google', logo: '/favicon.ico' },
];

export default function PartnersSection() {
  return (
    <section className={styles.partners}>
      <h3 className={styles.heading}>Đối tác đồng hành</h3>
      <div className={styles.grid}>
        {partners.map((p) => (
          <div key={p.name} className={styles.logoBox} title={p.name}>
            <Image src={p.logo} alt={p.name} width={120} height={60} />
            <span className={styles.name}>{p.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
} 