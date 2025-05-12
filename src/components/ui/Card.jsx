
import { motion } from 'motion/react';
const Card = ({ 
  children, 
  className = '', 
  hover = true,
  animated = true,
  ...props 
}) => {
  const hoverEffect = hover ? `
    hover:shadow-xl dark:hover:shadow-gray-800/30
    hover:-translate-y-1
    transition-all duration-300 ease-out
  ` : '';
  
  return animated ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`
        bg-white dark:bg-gray-800 
        rounded-2xl shadow-md dark:shadow-gray-900/20
        overflow-hidden
        ${hoverEffect}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  ) : (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-2xl shadow-md dark:shadow-gray-900/20
        overflow-hidden
        ${hoverEffect}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;