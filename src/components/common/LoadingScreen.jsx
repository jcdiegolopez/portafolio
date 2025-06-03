// LoadingScreen.jsx
import { motion, AnimatePresence } from 'motion/react';

const LoadingScreen = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="fixed inset-0 bg-zinc-950 z-[9999] flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2
              }}
              className="mb-8"
            >
              <div className="text-6xl font-bold tracking-tight mb-4">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  DL
                </span>
              </div>
              <motion.div
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [0.95, 1, 0.95]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-lg text-zinc-400"
              >
                Cargando portafolio...
              </motion.div>
            </motion.div>
            
            {/* Loading bar */}
            <motion.div 
              className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden mx-auto"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 256 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  delay: 0.8,
                  duration: 1.2,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;