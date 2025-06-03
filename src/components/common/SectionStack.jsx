// SectionStack.jsx
import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionCard from './SectionCard';

const SectionStack = forwardRef(({ 
  sections, 
  selectedSection, 
  isExpanded, 
  onSectionClick 
}, ref) => {
  const visibleSections = sections.filter(
    section => !selectedSection || section.id !== selectedSection.id
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-[2000] flex justify-center pt-4 pointer-events-none">
      <motion.div ref={ref} className="relative pointer-events-auto">
        <div className="relative w-72">
          <AnimatePresence>
            {visibleSections.map((section, index) => (
              <SectionCard
                key={section.id}
                section={section}
                index={index}
                sectionsLength={sections.length}
                isExpanded={isExpanded}
                onClick={onSectionClick}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
});

SectionStack.displayName = 'SectionStack';

export default SectionStack;