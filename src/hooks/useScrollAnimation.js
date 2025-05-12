import { useState, useEffect } from 'react';

/**
 * Custom hook for animations based on scroll position
 * @param {Number} startPosition - Scroll position where animation starts (in pixels or percentage)
 * @param {Number} endPosition - Scroll position where animation ends (in pixels or percentage)
 * @param {Boolean} isPercentage - Whether the positions are in percentages rather than pixels
 * @returns {Number} progress - Animation progress from 0 to 1
 */
const useScrollAnimation = (startPosition = 0, endPosition = 100, isPercentage = true) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate start and end positions in pixels if they're given as percentages
      const startPixel = isPercentage 
        ? (documentHeight - windowHeight) * (startPosition / 100)
        : startPosition;
        
      const endPixel = isPercentage 
        ? (documentHeight - windowHeight) * (endPosition / 100)
        : endPosition;
      
      // Calculate progress from 0 to 1
      if (scrollPosition <= startPixel) {
        setProgress(0);
      } else if (scrollPosition >= endPixel) {
        setProgress(1);
      } else {
        setProgress((scrollPosition - startPixel) / (endPixel - startPixel));
      }
    };

    // Initial calculation
    handleScroll();
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startPosition, endPosition, isPercentage]);

  return progress;
};

export default useScrollAnimation;