// hooks/useScrollNavigation.js
import { useState, useCallback, useRef, useEffect } from 'react';

export const useScrollNavigation = ({
  selectedSection,
  sections,
  isScrolling,
  setIsScrolling,
  setSelectedSection,
  setCurrentSectionIndex,
  sectionContentRef
}) => {
  const [scrollBuffer, setScrollBuffer] = useState({ top: 0, bottom: 0 });
  const scrollTimeoutRef = useRef(null);
  const lastScrollTimeRef = useRef(0);
  const scrollBufferThreshold = 400;

  // Navigate between sections
  const navigateSection = useCallback((direction) => {
    if (!selectedSection || isScrolling) return;
    
    const currentIndex = sections.findIndex(s => s.id === selectedSection.id);
    let newIndex;
    
    if (direction === 'up') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
    } else {
      newIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
    }
    
    if (newIndex !== currentIndex) {
      setIsScrolling(true);
      setSelectedSection(null);
      setScrollBuffer({ top: 0, bottom: 0 });
      
      setTimeout(() => {
        setSelectedSection(sections[newIndex]);
        setCurrentSectionIndex(newIndex);
        setTimeout(() => setIsScrolling(false), 600);
      }, 150);
    }
  }, [selectedSection, sections, isScrolling, setIsScrolling, setSelectedSection, setCurrentSectionIndex]);

  // Handle scroll events with improved sensitivity control
  const handleScroll = useCallback((event) => {
    if (!selectedSection || isScrolling) return;
    
    const sectionContent = sectionContentRef.current;
    if (sectionContent) {
      const { scrollTop, scrollHeight, clientHeight } = sectionContent;
      const isAtTop = scrollTop <= 10;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      
      const scrollingUp = event.deltaY < 0;
      const scrollingDown = event.deltaY > 0;
      
      if (scrollingUp && isAtTop) {
        const newTopBuffer = scrollBuffer.top + Math.abs(event.deltaY);
        setScrollBuffer(prev => ({ ...prev, top: newTopBuffer, bottom: 0 }));
        
        if (newTopBuffer > scrollBufferThreshold) {
          setScrollBuffer({ top: 0, bottom: 0 });
          navigateSection('up');
          return;
        }
      } else if (scrollingDown && isAtBottom) {
        const newBottomBuffer = scrollBuffer.bottom + Math.abs(event.deltaY);
        setScrollBuffer(prev => ({ ...prev, bottom: newBottomBuffer, top: 0 }));
        
        if (newBottomBuffer > scrollBufferThreshold) {
          setScrollBuffer({ top: 0, bottom: 0 });
          navigateSection('down');
          return;
        }
      } else if (!isAtTop && !isAtBottom) {
        setScrollBuffer({ top: 0, bottom: 0 });
        return;
      }
      
      if ((scrollingUp && !isAtTop) || (scrollingDown && !isAtBottom)) {
        setScrollBuffer({ top: 0, bottom: 0 });
        return;
      }
    }
    
    const now = Date.now();
    const timeSinceLastScroll = now - lastScrollTimeRef.current;
    
    if (timeSinceLastScroll < 800) return;
    
    const deltaY = Math.abs(event.deltaY);
    if (deltaY < 50) return;
    
    lastScrollTimeRef.current = now;
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  }, [selectedSection, navigateSection, isScrolling, scrollBuffer, sectionContentRef]);

  // Reset scroll buffer when section changes
  useEffect(() => {
    if (selectedSection) {
      setScrollBuffer({ top: 0, bottom: 0 });
    }
  }, [selectedSection]);

  // Add scroll event listener
  useEffect(() => {
    if (selectedSection) {
      window.addEventListener('wheel', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('wheel', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [selectedSection, handleScroll]);

  return { navigateSection };
};