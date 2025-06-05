
import { useState, useEffect, useRef } from 'react';
import { User, Briefcase, GraduationCap, Code, Mail, Home, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import LoadingScreen from './LoadingScreen';
import SectionStack from './SectionStack';
import SectionContent from './SectionContent';
import StatusIndicator from './StatusIndicator';
import { useScrollNavigation } from '../../hooks/useScrollNavigation';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useClickOutside } from '../../hooks/useClickOutside';

const PortfolioStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sections, setSections] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const stackRef = useRef(null);
  const sectionContentRef = useRef(null);

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
    },
    {
      id: 'cv-link',
      icon: FileText, 
      title: 'Mi CV',
      subtitle: 'Descargar PDF',
      color: 'from-green-600 to-teal-600',
      component: null, // No tiene componente
      isLink: true,
      link: '/assets/docs/cv_backend.pdf'
    }

  ];


  useEffect(() => {
    const initialSections = sectionTypes.map((type, index) => ({
      ...type,
      id: `${type.id}-${Date.now()}-${index}`,
      timestamp: Date.now() - (index * 1000 * 60 * 10)
    }));
    setSections(initialSections);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        if (initialSections.length > 0) {
          setSelectedSection(initialSections[0]);
          setCurrentSectionIndex(0);
        }
      }, 500);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);


  const { navigateSection } = useScrollNavigation({
    selectedSection,
    sections,
    isScrolling,
    setIsScrolling,
    setSelectedSection,
    setCurrentSectionIndex,
    sectionContentRef
  });

  useKeyboardNavigation({
    selectedSection,
    navigateSection,
    setSelectedSection
  });

  useClickOutside({
    stackRef,
    sectionContentRef,
    selectedSection,
    setSelectedSection,
    isExpanded,
    setIsExpanded
  });

  const handleSectionClick = (section, event) => {
  event.stopPropagation();
  if (section.isLink) {
    window.open(section.link, '_blank'); 
    return;
  }
  if (isExpanded) {
    if (selectedSection?.id === section.id) {
      setSelectedSection(null);
    } else {
      setSelectedSection(null);
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
      <LoadingScreen isLoading={isLoading} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >

        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 to-zinc-950 -z-10" />
        

        <AnimatePresence>
          {selectedSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <SectionStack
          ref={stackRef}
          sections={sections}
          selectedSection={selectedSection}
          isExpanded={isExpanded}
          onSectionClick={handleSectionClick}
        />

        <SectionContent
          ref={sectionContentRef}
          selectedSection={selectedSection}
          currentSectionIndex={currentSectionIndex}
          isScrolling={isScrolling}
        />

        <StatusIndicator
          selectedSection={selectedSection}
          currentSectionIndex={currentSectionIndex}
          sectionsLength={sections.length}
          isExpanded={isExpanded}
        />
      </motion.div>
    </div>
  );
};

export default PortfolioStack;