/**
 * Collection of animation variants for Framer Motion
 */

// Fade up animation (elements appear from below)
export const fadeUp = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: (custom = 0) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
        delay: custom * 0.1,
      }
    })
  };
  
  // Staggered fade in animation for lists
  export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  // Fade in animation for text
  export const textFadeIn = {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.6
      }
    }
  };
  
  // Scale animation for buttons and interactive elements
  export const scaleAnimation = {
    tap: { scale: 0.97 },
    hover: { scale: 1.05 }
  };
  
  // Appear animation for skill/tech badges
  export const badgeAnimation = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: (custom = 0) => ({ 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: custom * 0.05,
      }
    })
  };
  
  // Slide in animation for horizontal elements
  export const slideInFromLeft = {
    hidden: { 
      x: -50, 
      opacity: 0 
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };
  
  export const slideInFromRight = {
    hidden: { 
      x: 50, 
      opacity: 0 
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };
  
  // Text reveal animation (character by character)
  export const textReveal = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02
      }
    }
  };
  
  export const letterAnimation = {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };
  
  // Tilt on hover animation
  export const tiltOnHover = {
    rest: { 
      rotateX: 0, 
      rotateY: 0, 
      scale: 1 
    },
    hover: { 
      rotateX: 10, 
      rotateY: 10, 
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  // Bouncing animation (for attention-grabbing elements)
  export const bounce = {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }
    }
  };
  
  // Scroll-triggered animations for sections
  export const scrollAnimationProps = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.3 }
  };