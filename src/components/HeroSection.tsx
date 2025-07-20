import styles from './HeroSection.module.css';
import TypingText from './TypingText';
import Book3DModel from './Book3DModel';

export default function HeroSection({ onSuggest }: { onSuggest?: () => void }) {
  const fullText = 'Sàn giáo dục thương mại điện tử Antoree.Edu';

  return (
    <section className={styles.hero}>
      <div className={styles.bgAnimated}></div>
      <div className={styles.floatingElements}>
        <div className={styles.floatDot}></div>
        <div className={styles.floatDot}></div>
        <div className={styles.floatDot}></div>
      </div>
      <div className={styles.left}>
        <h1 className={styles.title}>
          <span className={styles.typingText}>
            <TypingText text={fullText} speed={60} pauseAfterEnd={1800} loop={true} />
          </span>
          <span className={styles.cursor}>|</span>
        </h1>
        <p className={styles.desc + ' ' + styles.fadeIn} style={{animationDelay: '0.2s'}}>
          Khám phá, tìm kiếm và yêu thích các khoá học, tài liệu, lớp học online chất lượng. 
          Gợi ý thông minh bởi AI giúp bạn chọn đúng sản phẩm phù hợp nhất!
        </p>
        <div className={styles.actions}>
          <a href="#products" className={styles.cta + ' ' + styles.glowBtn + ' ' + styles.rippleEffect}>
            Khám phá ngay
          </a>
          <button className={styles.suggestBtn + ' ' + styles.glowBtn + ' ' + styles.rippleEffect} onClick={onSuggest}>
            Gợi ý AI
          </button>
        </div>
      </div>
      <div className={styles.right}>
        {/* <Image src="/hero-image.png" alt="Hero" width={500} height={300} /> */}

        <div className='w-[400px] h-[400px]'>
          <Book3DModel />
        </div>
        
      </div>
    </section>
  );
} 