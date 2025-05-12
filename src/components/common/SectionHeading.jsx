import { useState, useRef, useEffect } from 'react';

const SectionHeading = ({ title, subtitle }) => {
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <div ref={headingRef} className="text-center">
      <h2 
        className={`text-4xl font-bold tracking-tight transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {title}
        </span>
      </h2>
      
      {subtitle && (
        <p 
          className={`mt-4 text-lg text-zinc-400 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {subtitle}
        </p>
      )}
      
      <div 
        className={`w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      />
    </div>
  );
};

export default SectionHeading;