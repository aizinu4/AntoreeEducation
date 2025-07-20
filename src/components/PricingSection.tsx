import styles from './PricingSection.module.css';

const plans = [
  {
    name: 'Cơ bản',
    price: 'Miễn phí',
    desc: 'Trải nghiệm học thử, tài liệu mẫu.',
    benefits: ['1 khoá học thử', 'Tài liệu miễn phí', 'Hỗ trợ cộng đồng'],
    highlight: false
  },
  {
    name: 'Nâng cao',
    price: '499.000đ',
    desc: 'Học không giới hạn, ưu đãi hấp dẫn.',
    benefits: ['Tất cả khoá học', 'Tài liệu nâng cao', 'Gợi ý AI cá nhân hoá', 'Hỗ trợ 24/7'],
    highlight: true
  },
  {
    name: 'VIP',
    price: '1.200.000đ',
    desc: 'Trải nghiệm tối đa, mentor riêng.',
    benefits: ['Tất cả khoá học', 'Mentor 1-1', 'Tài liệu độc quyền', 'Ưu tiên hỗ trợ', 'Quà tặng đặc biệt'],
    highlight: false
  },
];

export default function PricingSection() {
  return (
    <section className={styles.pricing}>
      <h3 className={styles.heading}>Bảng giá & Ưu đãi</h3>
      <div className={styles.grid}>
        {plans.map((p) => (
          <div key={p.name} className={p.highlight ? styles.cardHighlight : styles.card}>
            <div className={styles.name}>{p.name}</div>
            <div className={styles.price}>{p.price}</div>
            <div className={styles.desc}>{p.desc}</div>
            <ul className={styles.benefits}>
              {p.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <button className={styles.cta}>Đăng ký</button>
          </div>
        ))}
      </div>
    </section>
  );
} 