// StatusIndicator.jsx
import { motion } from 'motion/react';

const StatusIndicator = ({ 
  selectedSection, 
  currentSectionIndex, 
  sectionsLength, 
  isExpanded 
}) => {
  const getStatusText = () => {
    if (selectedSection) {
      return `Scroll dentro de la sección • ↑↓ para cambiar • ESC salir • ${currentSectionIndex + 1}/${sectionsLength}`;
    }
    if (isExpanded) {
      return 'Click fuera para contraer o elige una sección';
    }
    return 'Click en el stack para expandir';
  };

  return (
    <motion.div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-zinc-400 text-xs bg-zinc-900/80 backdrop-blur-sm px-3 py-2 rounded-full z-[2000] border border-zinc-700/50"
      animate={{
        opacity: selectedSection ? 0.7 : 1
      }}
    >
      {getStatusText()}
    </motion.div>
  );
};

export default StatusIndicator;