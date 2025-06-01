import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Footer from './Footer';

const AppLayout = ({ children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef(null);

  // Simular tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);



  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-950 z-50">
          <div className="text-4xl font-bold tracking-tight">
            <span className="inline-block animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              DL
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 to-zinc-950 -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.main
              ref={mainRef}
              className="pt-10 pb-10 min-h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.main>
          </div>
        </>
      )}
    </div>
  );
};

export default AppLayout;