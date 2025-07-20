import { DraggableCardContainer, DraggableCardBody } from './draggable-card';
import Image from 'next/image';
import styles from './FeaturesSection.module.css';

const features = [
  {
    icon: '/globe.svg',
    title: '1000+ Khoá học',
    desc: 'Khoá học đa dạng lĩnh vực, cập nhật liên tục.',
    style: 'translate-y-2 -rotate-3',
  },
  {
    icon: '/file.svg',
    title: 'Giảng viên uy tín',
    desc: 'Đội ngũ chuyên gia, nhiều năm kinh nghiệm.',
    style: '-translate-y-4 rotate-2',
  },
  {
    icon: '/window.svg',
    title: 'Gợi ý AI thông minh',
    desc: 'Cá nhân hoá lộ trình, chọn đúng sản phẩm phù hợp.',
    style: 'translate-y-0',
  },
  {
    icon: '/vercel.svg',
    title: 'Hỗ trợ 24/7',
    desc: 'Tư vấn, giải đáp nhanh chóng mọi lúc mọi nơi.',
    style: '-translate-y-4 -rotate-2',
  },
  {
    icon: '/next.svg',
    title: 'Cộng đồng học tập',
    desc: 'Kết nối, chia sẻ kinh nghiệm cùng hàng ngàn học viên.',
    style: 'translate-y-2 rotate-3',
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[500px] w-full overflow-x-auto" style={{marginBottom: 56}}>
      <p className="mb-8 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        Nền tảng giáo dục nổi bật của Antoree.Edu
      </p>
      <DraggableCardContainer className="flex flex-row items-end justify-center gap-6 w-full max-w-6xl px-2">
        {features.map((f) => (
          <DraggableCardBody key={f.title} className={`${styles.card} ${f.style}`}>
            <Image src={f.icon} alt={f.title} width={80} height={80} className={styles.icon} />
            <h4 className={styles.title}>{f.title}</h4>
            <p className={styles.desc}>{f.desc}</p>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  );
} 