// hooks/useKeyboardNavigation.js
import { useCallback, useEffect } from 'react';

export const useKeyboardNavigation = ({
  selectedSection,
  navigateSection,
  setSelectedSection
}) => {
  // Handle keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (!selectedSection) return;
    
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        navigateSection('up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        navigateSection('down');
        break;
      case 'Escape':
        setSelectedSection(null);
        break;
    }
  }, [selectedSection, navigateSection, setSelectedSection]);

  // Add keyboard event listener
  useEffect(() => {
    if (selectedSection) {
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedSection, handleKeyDown]);
};