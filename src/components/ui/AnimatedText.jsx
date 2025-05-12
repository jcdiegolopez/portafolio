import { useState, useEffect } from 'react';

const AnimatedText = ({ phrases }) => {
  const [current, setCurrent] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentPhrase = phrases[current];
      
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(100);
        
        if (displayText.length === currentPhrase.length) {
          setIsDeleting(true);
          setTypingSpeed(1500); // Pause before deleting
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        setTypingSpeed(50);
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrent((current + 1) % phrases.length);
          setTypingSpeed(300); // Pause before typing next phrase
        }
      }
    }, typingSpeed);
    
    return () => clearInterval(interval);
  }, [current, displayText, isDeleting, phrases, typingSpeed]);

  return (
    <div className="flex items-center h-full">
      <h2 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        {displayText}
        <span className="inline-block w-1 h-8 ml-1 bg-blue-400 animate-pulse" />
      </h2>
    </div>
  );
};

export default AnimatedText;