import { motion } from 'motion/react';
import { FaHome, FaUser, FaBriefcase, FaGraduationCap, FaCode, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

const sections = [
  { id: 'home', title: 'Inicio', description: 'Bienvenido a mi portafolio', icon: <FaHome className="w-5 h-5" /> },
  { id: 'about', title: 'Sobre Mí', description: 'Conoce mi historia', icon: <FaUser className="w-5 h-5" /> },
  { id: 'experience', title: 'Experiencia', description: 'Mi trayectoria profesional', icon: <FaBriefcase className="w-5 h-5" /> },
  { id: 'education', title: 'Educación', description: 'Mis estudios', icon: <FaGraduationCap className="w-5 h-5" /> },
  { id: 'projects', title: 'Proyectos', description: 'Mis creaciones', icon: <FaCode className="w-5 h-5" /> },
  { id: 'contact', title: 'Contacto', description: 'Ponte en contacto', icon: <FaEnvelope className="w-5 h-5" /> },
];

const NotificationStack = ({ activeSection, setActiveSection, isMinimized }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const stackRef = useRef(null);



  // Detectar clic fuera para contraer
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isExpanded && stackRef.current && !stackRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  const handleStackClick = () => {
    if (isMinimized && !isExpanded) {
      setIsExpanded(true);
    } else if (!isMinimized && !isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const handleSectionSelect = (sectionId) => {
    setActiveSection(sectionId);
    setIsExpanded(false);
    const element = document.getElementById(sectionId);
    console.log(`Navigating to section: ${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ordenar tarjetas para que la activa esté al frente
  const sortedSections = activeSection
    ? [
        ...sections.filter((section) => section.id === activeSection),
        ...sections.filter((section) => section.id !== activeSection),
      ]
    : sections;

  return (
    <motion.div
      className="fixed left-1/2 -translate-x-1/2 z-50"
      animate={{
        top: isMinimized && !isHovered && !isExpanded ? 4 : 4,
        translateY: 0,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative w-[280px] min-h-[40px]"
        ref={stackRef}
        onClick={handleStackClick}
      >
        {sortedSections.map((section, index) => (
          <motion.div
            key={section.id}
            className={`absolute flex items-center p-2 bg-zinc-900/50 backdrop-blur-md border border-zinc-700 rounded-xl shadow-md w-[280px] cursor-pointer
              ${activeSection === section.id && !isExpanded ? '' : activeSection === section.id ? 'opacity-0 pointer-events-none' : ''}`}
            style={{ top: 0, left: 0, right: index * 2 }}
            initial={{
              x: 0,
              zIndex: sortedSections.length - index,
              scale: 1 - index * 0.05,
              opacity: 1 - index * 0.05,
            }}
            animate={
              isExpanded
                ? {
                    top: index * 60,
                    left: 0,
                    right: 0,
                    x: 0,
                    zIndex: sortedSections.length - index,
                    scale: 1,
                    opacity: 1,
                  }
                : {
                    top: 0,
                    left: 0,
                    right: 0,
                    x: index * 5,
                    zIndex: sortedSections.length - index,
                    scale: 1 - index * 0.02,
                    opacity: 1 - index * 0.05,
                  }
            }
            whileHover={!isExpanded ? { scale: 1.05 } : {}}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            onClick={(e) => {
              if (isExpanded) {
                e.stopPropagation();
                handleSectionSelect(section.id);
              }
            }}
          >
            <div className="flex-shrink-0 text-zinc-100 bg-zinc-800 rounded-lg p-2">
              {section.icon}
            </div>
            <div className="ml-3">
              <h3 className="text-base font-semibold text-zinc-100">{section.title}</h3>
              <p className="text-xs text-zinc-400">{section.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationStack;