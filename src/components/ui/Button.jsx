import { motion } from 'motion/react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  icon = null,
  animated = true,
  disabled = false,
  ...props 
}) => {
  // Variants
  const variants = {
    primary: `bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg
              disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:from-primary-500 disabled:hover:to-primary-600 disabled:hover:shadow-md`,
    secondary: `bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-700`,
    outline: `bg-transparent border-2 border-primary-500 text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800
              disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-transparent`,
    ghost: `bg-transparent text-primary-500 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800
            disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-transparent`,
  };

  // Sizes
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  // Animation variants
  const buttonAnimation = {
    tap: animated ? { scale: 0.98 } : {},
    hover: animated ? { 
      y: -3,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    } : {},
  };

  return (
    <motion.button
      whileTap={disabled ? {} : buttonAnimation.tap}
      whileHover={disabled ? {} : buttonAnimation.hover}
      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg font-medium flex items-center gap-2
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
        ${className}
      `}
      {...props}
    >
      {icon && icon}
      {children}
    </motion.button>
  );
};

export default Button;