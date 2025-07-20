"use client";
import ProductList from '../components/ProductList';
import { courses } from '../data/products';
import styles from './HomePage.module.css';
import SearchBar from '../components/SearchBar';
import PriceFilter, { PriceRange } from '../components/PriceFilter';
import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import CategoryList from '../components/CategoryList';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PartnersSection from '../components/PartnersSection';
import BlogSection from '../components/BlogSection';
import FAQSection from '../components/FAQSection';
import VideoSection from '../components/VideoSection';
import PricingSection from '../components/PricingSection';
import SuggestionModal from '../components/SuggestionModal';
// import { getSuggestions } from '../goiyAI/mockAPI';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState<PriceRange[]>([]);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<typeof courses>([]);
  const [suggestionReason, setSuggestionReason] = useState('');
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const filterCourses = courses.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    let matchPrice = true;
    if (priceFilter.length > 0) {
      matchPrice = priceFilter.some(range => {
        if (range === '<500K') return p.price < 500000;
        if (range === '500K-1M') return p.price >= 500000 && p.price <= 1000000;
        if (range === '>1M') return p.price > 1000000;
        return false;
      });
    }
    return matchName && matchPrice;
  });

  const handleSuggestAI = async () => {
    setIsSuggestionModalOpen(true);
    setIsLoadingSuggestions(true);
    try {
      // Có thể lấy userId từ localStorage hoặc context nếu có
      const userId = 'demoUser';
      const res = await fetch(`/api/suggestions?userId=${userId}`);
      const result = await res.json();
      setSuggestedProducts(result.suggestedProducts);
      setSuggestionReason(result.reason);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      setSuggestedProducts([]);
      setSuggestionReason('Đã xảy ra lỗi khi lấy gợi ý');
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const closeSuggestionModal = () => {
    setIsSuggestionModalOpen(false);
  };

  return (
    <main className={styles.container}>
      <HeroSection onSuggest={handleSuggestAI} />
      <CategoryList />
      <div className={styles.filterBar}>
        <SearchBar value={search} onChange={setSearch} />
        <PriceFilter value={priceFilter} onChange={setPriceFilter} />
      </div>
      <div id="courses">
        <ProductList products={filterCourses} />
      </div>
      <FeaturesSection />
      <TestimonialsSection />
      <PartnersSection />
      <BlogSection />
      <FAQSection />
      <VideoSection />
      <PricingSection />
      
      <SuggestionModal
        isOpen={isSuggestionModalOpen}
        onClose={closeSuggestionModal}
        products={suggestedProducts}
        reason={suggestionReason}
        isLoading={isLoadingSuggestions}
      />
    </main>
  );
}
