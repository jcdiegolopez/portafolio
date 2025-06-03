// hooks/useClickOutside.js
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
      // Solo cerrar si clicamos fuera del stack Y fuera del contenido de la sección
      if (stackRef.current && !stackRef.current.contains(event.target)) {
        // Si hay una sección seleccionada, verificar si el clic fue dentro del contenido
        if (selectedSection) {
          const sectionContent = sectionContentRef.current;
          if (sectionContent && sectionContent.contains(event.target)) {
            // El clic fue dentro del contenido de la sección, no cerrar
            return;
          }
          // El clic fue fuera del contenido, cerrar la sección
          setSelectedSection(null);
        }
        
        // Para el stack expandido
        if (isExpanded) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, selectedSection, stackRef, sectionContentRef, setSelectedSection, setIsExpanded]);
};