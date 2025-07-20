import styles from './FAQSection.module.css';
import { useState } from 'react';

const faqs = [
  {
    q: 'Làm sao để đăng ký khoá học?',
    a: 'Bạn chỉ cần chọn khoá học mong muốn, bấm “Xem chi tiết” và làm theo hướng dẫn đăng ký.'
  },
  {
    q: 'Tôi có được hoàn tiền nếu không hài lòng?',
    a: 'Bạn được hoàn tiền 100% trong 7 ngày đầu nếu không hài lòng về chất lượng khoá học.'
  },
  {
    q: 'Có thể học thử miễn phí không?',
    a: 'Nhiều khoá học có bài học thử miễn phí, bạn hãy xem chi tiết từng khoá để trải nghiệm.'
  },
  {
    q: 'Thanh toán như thế nào?',
    a: 'Bạn có thể thanh toán qua thẻ, ví điện tử, chuyển khoản hoặc tiền mặt tại các điểm hỗ trợ.'
  },
  {
    q: 'Tôi cần hỗ trợ thì liên hệ ở đâu?',
    a: 'Bạn có thể liên hệ qua email support@antoree.edu hoặc hotline trên website.'
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={styles.faqs}>
      <h3 className={styles.heading}>Câu hỏi thường gặp</h3>
      <div className={styles.list}>
        {faqs.map((f, i) => (
          <div key={i} className={styles.item}>
            <button className={styles.question} onClick={() => setOpen(open === i ? null : i)}>
              <span>{f.q}</span>
              <span className={open === i ? styles.arrowOpen : styles.arrow}>▼</span>
            </button>
            {open === i && <div className={styles.answer}>{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
} 