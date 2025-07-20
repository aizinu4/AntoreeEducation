import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.mainContent}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <span className={styles.logoText}>
                Antoree<span className={styles.dot}>.</span>Edu
              </span>
            </div>
            <p className={styles.tagline}>
              Nền tảng giáo dục trực tuyến hàng đầu Việt Nam
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} title="Facebook">
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} title="YouTube">
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} title="Twitter">
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} title="LinkedIn">
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter Section - Moved up */}
          <div className={styles.newsletterSection}>
            <div className={styles.newsletterContent}>
              <h3 className={styles.newsletterTitle}>Đăng ký nhận tin tức</h3>
              <p className={styles.newsletterDesc}>
                Nhận thông báo về khóa học mới và ưu đãi đặc biệt
              </p>
              <div className={styles.newsletterForm}>
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  className={styles.newsletterInput}
                />
                <button className={styles.newsletterButton}>
                  <svg className={styles.sendIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>Khóa học</h3>
            <ul className={styles.linkList}>
              <li><Link href="/courses/programming" className={styles.footerLink}>Lập trình</Link></li>
              <li><Link href="/courses/design" className={styles.footerLink}>Thiết kế</Link></li>
              <li><Link href="/courses/marketing" className={styles.footerLink}>Marketing</Link></li>
              <li><Link href="/courses/business" className={styles.footerLink}>Kinh doanh</Link></li>
              <li><Link href="/courses/language" className={styles.footerLink}>Ngoại ngữ</Link></li>
            </ul>
          </div>

          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>Hỗ trợ</h3>
            <ul className={styles.linkList}>
              <li><Link href="/help" className={styles.footerLink}>Trung tâm trợ giúp</Link></li>
              <li><Link href="/contact" className={styles.footerLink}>Liên hệ</Link></li>
              <li><Link href="/faq" className={styles.footerLink}>Câu hỏi thường gặp</Link></li>
              <li><Link href="/feedback" className={styles.footerLink}>Góp ý</Link></li>
              <li><Link href="/troubleshoot" className={styles.footerLink}>Khắc phục sự cố</Link></li>
            </ul>
          </div>

          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>Công ty</h3>
            <ul className={styles.linkList}>
              <li><Link href="/about" className={styles.footerLink}>Về chúng tôi</Link></li>
              <li><Link href="/careers" className={styles.footerLink}>Tuyển dụng</Link></li>
              <li><Link href="/press" className={styles.footerLink}>Báo chí</Link></li>
              <li><Link href="/partners" className={styles.footerLink}>Đối tác</Link></li>
              <li><Link href="/blog" className={styles.footerLink}>Blog</Link></li>
            </ul>
          </div>

          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>Pháp lý</h3>
            <ul className={styles.linkList}>
              <li><Link href="/privacy" className={styles.footerLink}>Chính sách bảo mật</Link></li>
              <li><Link href="/terms" className={styles.footerLink}>Điều khoản sử dụng</Link></li>
              <li><Link href="/cookies" className={styles.footerLink}>Chính sách cookie</Link></li>
              <li><Link href="/gdpr" className={styles.footerLink}>GDPR</Link></li>
              <li><Link href="/accessibility" className={styles.footerLink}>Khả năng tiếp cận</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContent}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} Antoree.Edu. Tất cả quyền được bảo lưu.
          </div>
          <div className={styles.bottomLinks}>
            <Link href="/sitemap" className={styles.bottomLink}>Sitemap</Link>
            <span className={styles.separator}>•</span>
            <Link href="/accessibility" className={styles.bottomLink}>Khả năng tiếp cận</Link>
            <span className={styles.separator}>•</span>
            <Link href="/status" className={styles.bottomLink}>Trạng thái hệ thống</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 