import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Home, User, Briefcase, GraduationCap, Code, Mail } from 'lucide-react';
import LoadingScreen from './LoadingScreen';
import SectionStack from './SectionStack';
import SelectedSection from './SelectedSection';
import StatusIndicator from './StatusIndicator';
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
  const [scrollBuffer, setScrollBuffer] = useState({ top: 0, bottom: 0 });
  const scrollBufferThreshold = 400;
  const scrollTimeoutRef = useRef(null);
  const lastScrollTimeRef = useRef(0);
  const sectionContentRef = useRef(null);

  const sectionTypes = [
    { id: 'hero', icon: Home, title: 'Inicio', subtitle: 'Diego López - Desarrollador Backend', color: 'from-blue-600 to-purple-600', component: Hero },
    { id: 'about', icon: User, title: 'Sobre mí', subtitle: 'Perfil profesional y habilidades', color: 'from-purple-600 to-blue-600', component: About },
    { id: 'experience', icon: Briefcase, title: 'Experiencia', subtitle: 'Trayectoria profesional', color: 'from-blue-600 to-cyan-600', component: Experience },
    { id: 'education', icon: GraduationCap, title: 'Educación', subtitle: 'Formación académica', color: 'from-cyan-600 to-blue-600', component: Education },
    { id: 'projects', icon: Code, title: 'Proyectos', subtitle: 'Trabajos destacados', color: 'from-purple-600 to-pink-600', component: Projects },
    { id: 'contact', icon: Mail, title: 'Contacto', subtitle: 'Hablemos sobre oportunidades', color: 'from-pink-600 to-purple-600', component: Contact }
  ];

  // Initialize sections and loading
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

  // Navigate between sections
  const navigateSection = useCallback((direction) => {
    if (!selectedSection || isScrolling) return;
    const currentIndex = sections.findIndex(s => s.id === selectedSection.id);
    let newIndex = direction === 'up'
      ? currentIndex > 0 ? currentIndex - 1 : sections.length - 1
      : currentIndex < sections.length - 1 ? currentIndex + 1 : 0;

    if (newIndex !== currentIndex) {
      setIsScrolling(true);
      setSelectedSection(null);
      setScrollBuffer({ top: 0, bottom: 0 });
      setTimeout(() => {
        setSelectedSection(sections[newIndex]);
        setCurrentSectionIndex(newIndex);
        setTimeout(() => setIsScrolling(false), 600);
      }, 150);
    }
  }, [selectedSection, sections, isScrolling]);

  // Handle scroll events
  const handleScroll = useCallback((event) => {
    if (!selectedSection || isScrolling) return;
    const sectionContent = sectionContentRef.current;
    if (sectionContent) {
      const { scrollTop, scrollHeight, clientHeight } = sectionContent;
      const isAtTop = scrollTop <= 10;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      const scrollingUp = event.deltaY < 0;
      const scrollingDown = event.deltaY > 0;

      if (scrollingUp && isAtTop) {
        const newTopBuffer = scrollBuffer.top + Math.abs(event.deltaY);
        setScrollBuffer(prev => ({ ...prev, top: newTopBuffer, bottom: 0 }));
        if (newTopBuffer > scrollBufferThreshold) {
          setScrollBuffer({ top: 0, bottom: 0 });
          navigateSection('up');
          return;
        }
      } else if (scrollingDown && isAtBottom) {
        const newBottomBuffer = scrollBuffer.bottom + Math.abs(event.deltaY);
        setScrollBuffer(prev => ({ ...prev, bottom: newBottomBuffer, top: 0 }));
        if (newBottomBuffer > scrollBufferThreshold) {
          setScrollBuffer({ top: 0, bottom: 0 });
          navigateSection('down');
          return;
        }
      } else if (!isAtTop && !isAtBottom) {
        setScrollBuffer({ top: 0, bottom: 0 });
        return;
      }
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
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
  }, [selectedSection, isScrolling, scrollBuffer, navigateSection]);

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
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }
  }, [selectedSection, handleScroll, handleKeyDown]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const stackRef = document.querySelector('.section-stack');
      if (stackRef && !stackRef.contains(event.target)) {
        if (selectedSection && sectionContentRef.current && sectionContentRef.current.contains(event.target)) {
          return;
        }
        setSelectedSection(null);
        setScrollBuffer({ top: 0, bottom: 0 });
        if (isExpanded) setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, selectedSection]);

  // Handle section click
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
          sections={sections}
          selectedSection={selectedSection}
          isExpanded={isExpanded}
          onSectionClick={handleSectionClick}
        />
        <SelectedSection
          selectedSection={selectedSection}
          currentSectionIndex={currentSectionIndex}
          isScrolling={isScrolling}
          sections={sections}
        />
        <StatusIndicator
          selectedSection={selectedSection}
          isExpanded={isExpanded}
          currentSectionIndex={currentSectionIndex}
          sections={sections}
        />
      </motion.div>
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