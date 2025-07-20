import styles from './VideoSection.module.css';

export default function VideoSection() {
  return (
    <section className={styles.videoSection}>
      <h3 className={styles.heading}>Video giới thiệu Antoree.Edu</h3>
      <p className={styles.desc}>Khám phá cách Antoree.Edu giúp bạn học tập hiệu quả, cá nhân hoá và kết nối cộng đồng giáo dục hiện đại.</p>
      <div className={styles.videoWrapper}>
        <iframe
          className={styles.video}
          src="https://www.youtube.com/embed/ysz5S6PUM-U"
          title="Giới thiệu Antoree.Edu"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
} 