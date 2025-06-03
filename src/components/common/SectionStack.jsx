import { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SectionCard from './SectionCard';

const SectionStack = ({ sections, selectedSection, isExpanded, onSectionClick }) => {
  const stackRef = useRef(null);
  return (
    <div className="fixed top-0 left-0 right-0 z-[2000] flex justify-center pt-4 pointer-events-none">
      <motion.div ref={stackRef} className="relative pointer-events-auto">
        <div className="relative w-72">
          <AnimatePresence>
            {sections
              .filter(section => !selectedSection || section.id !== selectedSection.id)
              .map((section, index) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  index={index}
                  isExpanded={isExpanded}
                  isSelected={selectedSection?.id === section.id}
                  onClick={(e) => onSectionClick(section, e)}
                />
              ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionStack;