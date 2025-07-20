'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AIChatbot.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'course';
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là AI Assistant của Antoree.Edu. Tôi có thể giúp bạn tìm khóa học phù hợp. Bạn muốn học gì hôm nay?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('react') || lowerMessage.includes('javascript') || lowerMessage.includes('frontend')) {
      return {
        text: 'Tôi thấy bạn quan tâm đến Frontend Development! Đây là một số khóa học phù hợp:',
        type: 'suggestion' as const,
        courses: [
          {
            id: '1',
            title: 'React.js Cơ bản đến Nâng cao',
            description: 'Học React từ cơ bản đến advanced patterns',
            price: 299000,
            rating: 4.8,
            image: '/api/placeholder/200/150'
          },
          {
            id: '2',
            title: 'JavaScript ES6+ Masterclass',
            description: 'Làm chủ JavaScript hiện đại',
            price: 199000,
            rating: 4.9,
            image: '/api/placeholder/200/150'
          }
        ]
      };
    } else if (lowerMessage.includes('design') || lowerMessage.includes('ui') || lowerMessage.includes('ux')) {
      return {
        text: 'Tuyệt vời! Design là lĩnh vực rất hot hiện nay. Đây là các khóa học thiết kế:',
        type: 'suggestion' as const,
        courses: [
          {
            id: '3',
            title: 'UI/UX Design Masterclass',
            description: 'Thiết kế giao diện người dùng chuyên nghiệp',
            price: 399000,
            rating: 4.9,
            image: '/api/placeholder/200/150'
          }
        ]
      };
    } else if (lowerMessage.includes('marketing') || lowerMessage.includes('digital')) {
      return {
        text: 'Digital Marketing đang là xu hướng! Đây là khóa học phù hợp:',
        type: 'suggestion' as const,
        courses: [
          {
            id: '4',
            title: 'Digital Marketing Complete Course',
            description: 'Từ cơ bản đến nâng cao về marketing số',
            price: 299000,
            rating: 4.7,
            image: '/api/placeholder/200/150'
          }
        ]
      };
    } else {
      return {
        text: 'Tôi hiểu bạn đang tìm kiếm khóa học phù hợp. Bạn có thể cho tôi biết thêm về:\n\n• Lĩnh vực bạn muốn học (lập trình, thiết kế, marketing...)\n• Mức độ kinh nghiệm hiện tại\n• Mục tiêu học tập của bạn',
        type: 'text' as const
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    simulateTyping(() => {
      const botResponse = generateBotResponse(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        type: botResponse.type
      };

      setMessages(prev => [...prev, botMessage]);

      // Add course suggestions if available
      if (botResponse.type === 'suggestion' && botResponse.courses) {
        botResponse.courses.forEach((course, index) => {
          setTimeout(() => {
            const courseMessage: Message = {
              id: (Date.now() + 2 + index).toString(),
              text: `${course.title} - ${course.description}`,
              sender: 'bot',
              timestamp: new Date(),
              type: 'course'
            };
            setMessages(prev => [...prev, courseMessage]);
          }, (index + 1) * 500);
        });
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    'Tôi muốn học lập trình',
    'Khóa học thiết kế',
    'Marketing online',
    'Khóa học miễn phí',
    'Tư vấn chi tiết'
  ];

  return (
    <>
      {/* Chatbot Trigger */}
      <button 
        className={styles.chatbotTrigger}
        onClick={() => setIsOpen(true)}
        aria-label="AI Assistant"
      >
        <div className={styles.triggerIcon}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div className={styles.triggerText}>
          <span className={styles.triggerTitle}>AI Assistant</span>
          <span className={styles.triggerSubtitle}>Tư vấn khóa học</span>
        </div>
        <div className={styles.triggerStatus}>
          <div className={styles.statusDot}></div>
        </div>
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className={styles.chatbotOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.chatbotModal} onClick={(e) => e.stopPropagation()}>
            {/* Chatbot Header */}
            <div className={styles.chatbotHeader}>
              <div className={styles.botInfo}>
                <div className={styles.botAvatar}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className={styles.botDetails}>
                  <h3 className={styles.botName}>Antoree AI Assistant</h3>
                  <span className={styles.botStatus}>Đang hoạt động</span>
                </div>
              </div>
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

            {/* Messages Container */}
            <div className={styles.messagesContainer}>
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.botMessage}`}
                >
                  {message.sender === 'bot' && (
                    <div className={styles.botAvatar}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    <div className={styles.messageText}>{message.text}</div>
                    <div className={styles.messageTime}>
                      {message.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className={`${styles.message} ${styles.botMessage}`}>
                  <div className={styles.botAvatar}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className={styles.messageContent}>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className={styles.quickReplies}>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className={styles.quickReply}
                    onClick={() => {
                      setInputValue(reply);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input Section */}
            <div className={styles.inputSection}>
              <div className={styles.inputWrapper}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={styles.messageInput}
                />
                <button
                  className={styles.sendButton}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 