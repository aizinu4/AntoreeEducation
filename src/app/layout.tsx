import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import AIChatbot from '../components/AIChatbot';
import { FavoritesProvider } from '../contexts/FavoritesContext';

export const metadata: Metadata = {
  title: 'Antoree.Edu - Nền tảng giáo dục trực tuyến hàng đầu Việt Nam',
  description: 'Khám phá các khóa học chất lượng cao về lập trình, thiết kế, marketing và kinh doanh. Học trực tuyến với giảng viên chuyên nghiệp.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <FavoritesProvider>
          <ParticleBackground />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <AIChatbot />
        </FavoritesProvider>
      </body>
    </html>
  );
}
