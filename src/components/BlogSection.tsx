import styles from './BlogSection.module.css';
import Image from 'next/image';

const blogs = [
  {
    title: '5 bí quyết học ngoại ngữ hiệu quả',
    image: '/image/vidu.jpg',
    desc: 'Khám phá các phương pháp học ngoại ngữ giúp bạn tiến bộ nhanh chóng và bền vững.',
    link: '#'
  },
  {
    title: 'Lập trình cho người mới bắt đầu',
    image: '/image/vidu.jpg',
    desc: 'Những bước đầu tiên để học lập trình hiệu quả, phù hợp cho mọi lứa tuổi.',
    link: '#'
  },
  {
    title: 'Kỹ năng mềm quan trọng trong thời đại số',
    image: '/image/vidu.jpg',
    desc: 'Tại sao kỹ năng mềm lại quan trọng và cách phát triển chúng trong học tập, công việc.',
    link: '#'
  },
];

export default function BlogSection() {
  return (
    <section className={styles.blogs}>
      <h3 className={styles.heading}>Blog giáo dục nổi bật</h3>
      <div className={styles.grid}>
        {blogs.map((b) => (
          <div key={b.title} className={styles.card}>
            <Image src={b.image} alt={b.title} width={400} height={250} />
            <div className={styles.info}>
              <h4 className={styles.title}>{b.title}</h4>
              <p className={styles.desc}>{b.desc}</p>
              <a href={b.link} className={styles.more}>Xem thêm →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 