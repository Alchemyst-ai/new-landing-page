// components/StreamingText.tsx
import React, { useState, useEffect } from 'react';

const StreamingText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  // Typing logic
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 5); 

      return () => clearTimeout(timeout);
    }
  }, [text, index]);

  return <span>{displayedText}</span>;
};

export default StreamingText;
