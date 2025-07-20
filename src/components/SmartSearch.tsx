'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './SmartSearch.module.css';
import Image from 'next/image';
import { courses } from '../data/products';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  price: number;
  image: string;
  tags: string[];
}

// Khai báo type cho SpeechRecognition nếu chưa có
declare global {
  type SpeechRecognitionConstructor = new () => SpeechRecognition;
  interface SpeechRecognition extends EventTarget {
    start(): void;
    stop(): void;
    abort(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: Event) => void) | null;
    continuous: boolean;
    interimResults: boolean;
    lang: string;
  }
  interface SpeechRecognitionEvent extends Event {
    results: {
      0: {
        0: { transcript: string }
      }
    };
  }
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}


export default function SmartSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      setIsVoiceSupported(true);
      recognitionRef.current = SpeechRecognitionClass ? new SpeechRecognitionClass() : null;
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'vi-VN';
      }
    } else {
      setVoiceError('Trình duyệt của bạn không hỗ trợ tìm kiếm bằng giọng nói.');
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Tìm kiếm trên toàn bộ courses thật
    const results = courses.filter(course =>
      course.name.toLowerCase().includes(query.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      course.longDescription.toLowerCase().includes(query.toLowerCase())
    ).map(course => ({
      id: course.id,
      title: course.name,
      category: '',
      instructor: '',
      rating: course.rating,
      price: course.price,
      image: course.image,
      tags: []
    }));
    setSearchResults(results);
  };

  const startVoiceSearch = () => {
    if (!recognitionRef.current) {
      setVoiceError('Không thể khởi động tính năng nhận diện giọng nói.');
      return;
    }
    setVoiceError(null);
    setIsListening(true);
    recognitionRef.current.start();
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      handleSearch(transcript);
      setIsListening(false);
    };
    recognitionRef.current.onerror = () => {
      setIsListening(false);
      setVoiceError('Không nhận diện được giọng nói. Vui lòng thử lại!');
    };
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const filters = [
    { id: 'all', label: 'Tất cả', icon: '🔍' },
    { id: 'programming', label: 'Lập trình', icon: '💻' },
    { id: 'design', label: 'Thiết kế', icon: '🎨' },
    { id: 'marketing', label: 'Marketing', icon: '📈' },
    { id: 'business', label: 'Kinh doanh', icon: '💼' }
  ];

  return (
    <>
      {/* Search Trigger Button */}
      <button 
        className={styles.searchTrigger}
        onClick={() => setIsOpen(true)}
        aria-label="Tìm kiếm"
      >
        <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <span className={styles.searchText}>Tìm kiếm khóa học...</span>
        <kbd className={styles.shortcut}>⌘K</kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className={styles.searchOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.searchModal} onClick={(e) => e.stopPropagation()}>
            {/* Search Header */}
            <div className={styles.searchHeader}>
              <div className={styles.searchInputWrapper}>
                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Tìm kiếm khóa học, giảng viên, chủ đề..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={styles.searchInput}
                  autoFocus
                />
                {isVoiceSupported && (
                  <button
                    className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`}
                    onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                    title={isListening ? 'Dừng ghi âm' : 'Tìm kiếm bằng giọng nói'}
                  >
                    <svg className={styles.voiceIcon} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                  </button>
                )}
                {voiceError && (
                  <div style={{ color: 'red', marginTop: 8, fontSize: '0.95em' }}>{voiceError}</div>
                )}
                <button
                  className={styles.closeButton}
                  onClick={() => setIsOpen(false)}
                  aria-label="Đóng"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Smart Filters */}
            <div className={styles.filtersSection}>
              <div className={styles.filtersList}>
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`${styles.filterButton} ${activeFilter === filter.id ? styles.active : ''}`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    <span className={styles.filterIcon}>{filter.icon}</span>
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Results */}
            <div className={styles.resultsSection}>
              {searchQuery && searchResults.length > 0 ? (
                <div className={styles.resultsList}>
                  {searchResults.map((result) => (
                    <div key={result.id} className={styles.resultCard}>
                      <div className={styles.resultImage}>
                        <Image src={result.image} alt={result.title} fill />
                      </div>
                      <div className={styles.resultContent}>
                        <h3 className={styles.resultTitle}>{result.title}</h3>
                        <p className={styles.resultInstructor}>Giảng viên: {result.instructor}</p>
                        <div className={styles.resultMeta}>
                          <span className={styles.resultRating}>⭐ {result.rating}</span>
                          <span className={styles.resultPrice}>{result.price.toLocaleString()}đ</span>
                        </div>
                        <div className={styles.resultTags}>
                          {result.tags.map((tag) => (
                            <span key={tag} className={styles.resultTag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className={styles.noResults}>
                  <svg className={styles.noResultsIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  <p>Không tìm thấy kết quả cho &quot;{searchQuery}&quot;</p>
                  <p className={styles.noResultsSuggestion}>Thử tìm kiếm với từ khóa khác</p>
                </div>
              ) : (
                <div className={styles.searchSuggestions}>
                  <h3>Gợi ý tìm kiếm</h3>
                  <div className={styles.suggestionsList}>
                    <button className={styles.suggestionItem}>React.js</button>
                    <button className={styles.suggestionItem}>UI/UX Design</button>
                    <button className={styles.suggestionItem}>Digital Marketing</button>
                    <button className={styles.suggestionItem}>Business Strategy</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 