import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for detecting when an element enters the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {Number} options.threshold - A number between 0 and 1 indicating visibility percentage
 * @param {String|Element} options.root - The element used as viewport
 * @param {String} options.rootMargin - Margin around the root
 * @returns {Array} [ref, isIntersecting, entry] - Reference to observe, boolean if visible, and the full IntersectionObserverEntry
 */
const useIntersectionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
} = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      { 
        threshold,
        root: typeof root === 'string' ? document.querySelector(root) : root,
        rootMargin 
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, root, rootMargin]);

  return [elementRef, isIntersecting, entry];
};

export default useIntersectionObserver;