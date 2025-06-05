import { useRef} from 'react';

const SectionHeading = ({ title, subtitle }) => {
  const headingRef = useRef(null);

  return (
    <div ref={headingRef} className="text-center">
      <h2 
        className={`text-4xl font-bold tracking-tight transition-all duration-700 
           'opacity-100 translate-y-0' : 
        `}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {title}
        </span>
      </h2>
      
      {subtitle && (
        <p 
          className={`mt-4 text-lg text-zinc-400 transition-all duration-700 delay-200 
             'opacity-100 translate-y-0' }`}
        >
          {subtitle}
        </p>
      )}
      
      <div 
        className={`w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700 delay-400  'opacity-100 scale-100' 
        }`}
      />
    </div>
  );
};

export default SectionHeading;