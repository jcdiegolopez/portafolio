// SectionContent.jsx
import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SectionContent = forwardRef(({ 
  selectedSection, 
  currentSectionIndex, 
  isScrolling 
}, ref) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {selectedSection && (
          <motion.div
            key={selectedSection.id}
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 50,
              x: '-50%',
              width: 288,
              height: 60,
              transformOrigin: 'center top'
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: '-50%',
              width: '100vw',
              height: '100vh',
              borderRadius: 0,
              zIndex: 1000
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: isScrolling ? (currentSectionIndex > 0 ? -50 : 50) : 50,
              x: '-50%',
              width: 288,
              height: 60,
              transition: { duration: 0.15 }
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 30,
              mass: 0.8
            }}
            className="fixed top-0 left-1/2 pointer-events-auto"
            style={{ transformOrigin: 'center top' }}
          >
            <motion.div className="relative overflow-hidden w-full h-full bg-zinc-950">
              <div 
                ref={ref}
                className="w-full h-full overflow-y-auto pt-20 pb-6 scrollbar-hide"
                style={{ 
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {selectedSection.component && <selectedSection.component />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS para ocultar scrollbar */}
      <style jsx="true">{`
        .scrollbar-hide {
          -webkit-scrollbar: none;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
});

SectionContent.displayName = 'SectionContent';

export default SectionContent;