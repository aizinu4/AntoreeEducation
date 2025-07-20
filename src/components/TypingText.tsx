import React, { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number; // ms per character
  pauseAfterEnd?: number; // ms pause after finishing typing
  loop?: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50, pauseAfterEnd = 1500, loop = false }) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, index + 1));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (loop) {
      const timeout = setTimeout(() => {
        setDisplayed('');
        setIndex(0);
      }, pauseAfterEnd);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, pauseAfterEnd, loop]);

  return <span>{displayed}</span>;
};

export default TypingText; 