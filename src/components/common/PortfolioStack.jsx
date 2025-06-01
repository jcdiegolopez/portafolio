import { useState, useEffect, useCallback, useRef } from 'react';
import { User, Briefcase, GraduationCap, Code, Mail, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

const PortfolioStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sections, setSections] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const stackRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastScrollTimeRef = useRef(0);
  const sectionContentRef = useRef(null);
  
  // Estado para controlar el scroll sensible
  const [scrollBuffer, setScrollBuffer] = useState({ top: 0, bottom: 0 });
  const scrollBufferThreshold = 400; // Píxeles adicionales que deben scrollear

  // Portfolio sections data
  const sectionTypes = [
    {
      id: 'hero',
      icon: Home,
      title: 'Inicio',
      subtitle: 'Diego López - Desarrollador Backend',
      color: 'from-blue-600 to-purple-600',
      component: Hero
    },
    {
      id: 'about',
      icon: User,
      title: 'Sobre mí',
      subtitle: 'Perfil profesional y habilidades',
      color: 'from-purple-600 to-blue-600',
      component: About
    },
    {
      id: 'experience',
      icon: Briefcase,
      title: 'Experiencia',
      subtitle: 'Trayectoria profesional',
      color: 'from-blue-600 to-cyan-600',
      component: Experience
    },
    {
      id: 'education',
      icon: GraduationCap,
      title: 'Educación',
      subtitle: 'Formación académica',
      color: 'from-cyan-600 to-blue-600',
      component: Education
    },
    {
      id: 'projects',
      icon: Code,
      title: 'Proyectos',
      subtitle: 'Trabajos destacados',
      color: 'from-purple-600 to-pink-600',
      component: Projects
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Contacto',
      subtitle: 'Hablemos sobre oportunidades',
      color: 'from-pink-600 to-purple-600',
      component: Contact
    }
  ];

  // Initialize sections and loading
  useEffect(() => {
    const initialSections = sectionTypes.map((type, index) => ({
      ...type,
      id: `${type.id}-${Date.now()}-${index}`,
      timestamp: Date.now() - (index * 1000 * 60 * 10)
    }));
    setSections(initialSections);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Navigate between sections
  const navigateSection = useCallback((direction) => {
    if (!selectedSection || isScrolling) return;
    
    const currentIndex = sections.findIndex(s => s.id === selectedSection.id);
    let newIndex;
    
    if (direction === 'up') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
    } else {
      newIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
    }
    
    if (newIndex !== currentIndex) {
      setIsScrolling(true);
      setSelectedSection(null);
      setScrollBuffer({ top: 0, bottom: 0 }); // Reset buffer
      
      setTimeout(() => {
        setSelectedSection(sections[newIndex]);
        setCurrentSectionIndex(newIndex);
        setTimeout(() => setIsScrolling(false), 600);
      }, 150);
    }
  }, [selectedSection, sections, isScrolling]);

  // Handle scroll events with improved sensitivity control
  const handleScroll = useCallback((event) => {
    if (!selectedSection || isScrolling) return;
    
    // Check if we're scrolling within the section content
    const sectionContent = sectionContentRef.current;
    if (sectionContent) {
      const { scrollTop, scrollHeight, clientHeight } = sectionContent;
      const isAtTop = scrollTop <= 10;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      
      const scrollingUp = event.deltaY < 0;
      const scrollingDown = event.deltaY > 0;
      
      // Mejorar el control de sensibilidad con buffer
      if (scrollingUp && isAtTop) {
        // Scrolleando hacia arriba y estamos en el top
        const newTopBuffer = scrollBuffer.top + Math.abs(event.deltaY);
        setScrollBuffer(prev => ({ ...prev, top: newTopBuffer, bottom: 0 }));
        
        if (newTopBuffer > scrollBufferThreshold) {
          setScrollBuffer({ top: 0, bottom: 0 });
          navigateSection('up');
          return;
        }
      } else if (scrollingDown && isAtBottom) {
        // Scrolleando hacia abajo y estamos en el bottom
        const newBottomBuffer = scrollBuffer.bottom + Math.abs(event.deltaY);
        setScrollBuffer(prev => ({ ...prev, bottom: newBottomBuffer, top: 0 }));
        
        if (newBottomBuffer > scrollBufferThreshold) {
          setScrollBuffer({ top: 0, bottom: 0 });
          navigateSection('down');
          return;
        }
      } else if (!isAtTop && !isAtBottom) {
        // Si no estamos en los límites, resetear el buffer
        setScrollBuffer({ top: 0, bottom: 0 });
        return; // Let the section scroll naturally
      }
      
      // Si estamos scrolleando en dirección opuesta al límite, permitir scroll normal
      if ((scrollingUp && !isAtTop) || (scrollingDown && !isAtBottom)) {
        setScrollBuffer({ top: 0, bottom: 0 });
        return;
      }
    }
    
    const now = Date.now();
    const timeSinceLastScroll = now - lastScrollTimeRef.current;
    
    if (timeSinceLastScroll < 800) return;
    
    const deltaY = Math.abs(event.deltaY);
    if (deltaY < 50) return;
    
    lastScrollTimeRef.current = now;
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  }, [selectedSection, navigateSection, isScrolling, scrollBuffer]);

  // Reset scroll buffer when section changes
  useEffect(() => {
    if (selectedSection) {
      setScrollBuffer({ top: 0, bottom: 0 });
    }
  }, [selectedSection]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (!selectedSection) return;
    
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        navigateSection('up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        navigateSection('down');
        break;
      case 'Escape':
        setSelectedSection(null);
        setScrollBuffer({ top: 0, bottom: 0 });
        break;
    }
  }, [selectedSection, navigateSection]);

  // Add event listeners
  useEffect(() => {
    if (selectedSection) {
      window.addEventListener('wheel', handleScroll, { passive: true });
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('keydown', handleKeyDown);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [selectedSection, handleScroll, handleKeyDown]);

  // Handle clicks outside the stack
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stackRef.current && !stackRef.current.contains(event.target)) {
        if (isExpanded) {
          setIsExpanded(false);
        }
        if (selectedSection) {
          setSelectedSection(null);
          setScrollBuffer({ top: 0, bottom: 0 });
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, selectedSection]);

  const handleSectionClick = (section, event) => {
    event.stopPropagation();
    if (isExpanded) {
      if (selectedSection?.id === section.id) {
        setSelectedSection(null);
        setScrollBuffer({ top: 0, bottom: 0 });
      } else {
        setSelectedSection(null);
        setScrollBuffer({ top: 0, bottom: 0 });
        setTimeout(() => {
          setSelectedSection(section);
          setCurrentSectionIndex(sections.findIndex(s => s.id === section.id));
          setIsExpanded(false);
        }, 300);
      }
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden relative">
      {/* Loading Screen */}
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

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Background gradient */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 to-zinc-950 -z-10" />
        
        {/* Overlay for when a section is open */}
        <AnimatePresence>
          {selectedSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
          )}
        </AnimatePresence>

        {/* Section Stack - Smaller and positioned better */}
        <div className="fixed top-0 left-0 right-0 z-[2000] flex justify-center pt-4 pointer-events-none">
          <motion.div ref={stackRef} className="relative pointer-events-auto">
            <div className="relative w-72">
              <AnimatePresence>
                {sections
                  .filter(section => !selectedSection || section.id !== selectedSection.id)
                  .map((section, index) => {
                    const IconComponent = section.icon;
                    return (
                      <motion.div
                        key={section.id}
                        layout
                        layoutId={`section-${section.id}`}
                        initial={{ 
                          y: -100,
                          opacity: 0,
                          scale: 0.8,
                          rotateX: -15
                        }}
                        animate={{
                          y: isExpanded ? index * 75 : index * 3,
                          x: isExpanded ? 0 : index * 1.5,
                          opacity: index < 6 ? 1 : 0,
                          scale: 1 - (index * 0.025),
                          rotateX: isExpanded ? 0 : index * 1.5,
                          rotateZ: isExpanded ? 0 : index * 0.5,
                          zIndex: sections.length - index + 1000,
                          width: 288,
                          height: 60,
                          borderRadius: 12
                        }}
                        exit={{
                          y: -50,
                          opacity: 0,
                          scale: 0.8,
                          transition: { duration: 0.3 }
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 30,
                          mass: 0.8
                        }}
                        className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer shadow-2xl"
                        style={{
                          transformOrigin: 'center top',
                          filter: `brightness(${1 - index * 0.08})`
                        }}
                        onClick={(e) => handleSectionClick(section, e)}
                      >
                        <motion.div
                          layout
                          className={`relative overflow-hidden w-full h-full bg-gradient-to-r ${section.color} backdrop-blur-md shadow-xl border border-zinc-700/30`}
                          style={{ borderRadius: 'inherit' }}
                        >
                          <motion.div
                            layout
                            className="px-3 py-3 flex items-center h-full"
                          >
                            <motion.div
                              layout
                              className="p-2 bg-white/10 rounded-lg mr-3 backdrop-blur-sm flex-shrink-0 border border-white/20"
                            >
                              <IconComponent className="w-5 h-5 text-white" />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <motion.h3 
                                layout
                                className="font-semibold text-white truncate text-base"
                              >
                                {section.title}
                              </motion.h3>
                              <motion.p 
                                layout
                                className="text-xs text-white/70 truncate"
                              >
                                {section.subtitle}
                              </motion.p>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Selected Section - With proper spacing and hidden scrollbar */}
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
              className="fixed top-0 left-1/2"
              style={{ transformOrigin: 'center top' }}
            >
              <motion.div
                className="relative overflow-hidden w-full h-full bg-zinc-950"
              >
                <div 
                  ref={sectionContentRef}
                  className="w-full h-full overflow-y-auto pt-20 pb-6 scrollbar-hide"
                  style={{ 
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none'  /* IE and Edge */
                  }}
                >
                  {selectedSection.component && <selectedSection.component />}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Indicator */}
        <motion.div 
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-zinc-400 text-xs bg-zinc-900/80 backdrop-blur-sm px-3 py-2 rounded-full z-[2000] border border-zinc-700/50"
          animate={{
            opacity: selectedSection ? 0.7 : 1
          }}
        >
          {selectedSection ? 
            `Scroll dentro de la sección • ↑↓ para cambiar • ESC salir • ${currentSectionIndex + 1}/${sections.length}` : 
           isExpanded ? 'Click fuera para contraer o elige una sección' : 
           'Click en el stack para expandir'}
        </motion.div>
      </motion.div>

      {/* CSS para ocultar scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -webkit-scrollbar: none;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default PortfolioStack;