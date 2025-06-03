import { useEffect } from 'react';

export const useClickOutside = ({
  stackRef,
  sectionContentRef,
  selectedSection,
  setSelectedSection,
  isExpanded,
  setIsExpanded
}) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedStack = stackRef?.current?.contains(event.target);
      const clickedContent = sectionContentRef?.current?.contains(event.target);

      if (!clickedStack && clickedContent && isExpanded) {
        setIsExpanded(false);
        return;
      }

      if (!clickedStack && !clickedContent) {
        if (selectedSection) setSelectedSection(null);
        if (isExpanded) setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [stackRef, sectionContentRef, selectedSection, isExpanded, setSelectedSection, setIsExpanded]);
};
