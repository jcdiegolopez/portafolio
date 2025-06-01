import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, MessageCircle, Calendar, Settings, Heart, Star, Users, Zap } from 'lucide-react';

const Test = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const stackRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastScrollTimeRef = useRef(0);

  // Sample notification data
  const notificationTypes = [
    {
      id: 'activity',
      icon: Heart,
      title: 'Actividad',
      subtitle: '3 nuevas actividades',
      color: 'from-pink-500 to-rose-500',
      content: {
        title: 'Resumen de Actividad',
        items: [
          { icon: Heart, text: 'Completaste tu objetivo de pasos', time: '2h' },
          { icon: Star, text: 'Nueva insignia desbloqueada', time: '4h' },
          { icon: Zap, text: 'Racha de 7 días mantenida', time: '1d' }
        ]
      }
    },
    {
      id: 'messages',
      icon: MessageCircle,
      title: 'Mensajes',
      subtitle: '5 mensajes nuevos',
      color: 'from-blue-500 to-cyan-500',
      content: {
        title: 'Mensajes Recientes',
        items: [
          { icon: Users, text: 'María: ¿Vamos a cenar hoy?', time: '10m' },
          { icon: Users, text: 'Carlos: Revisaste el documento?', time: '1h' },
          { icon: Users, text: 'Ana: Gracias por la ayuda!', time: '2h' }
        ]
      }
    },
    {
      id: 'events',
      icon: Calendar,
      title: 'Eventos',
      subtitle: '2 eventos próximos',
      color: 'from-purple-500 to-indigo-500',
      content: {
        title: 'Próximos Eventos',
        items: [
          { icon: Calendar, text: 'Reunión de equipo', time: 'En 30m' },
          { icon: Calendar, text: 'Almuerzo con cliente', time: 'Hoy 14:00' },
          { icon: Calendar, text: 'Presentación proyecto', time: 'Mañana 10:00' }
        ]
      }
    },
    {
      id: 'settings',
      icon: Settings,
      title: 'Sistema',
      subtitle: 'Actualización disponible',
      color: 'from-green-500 to-emerald-500',
      content: {
        title: 'Configuración del Sistema',
        items: [
          { icon: Settings, text: 'Nueva actualización disponible', time: 'Ahora' },
          { icon: Star, text: 'Respaldo completado exitosamente', time: '2h' },
          { icon: Zap, text: 'Optimización de rendimiento', time: '1d' }
        ]
      }
    }
  ];

  // Generate initial notifications
  useEffect(() => {
    const initialNotifications = notificationTypes.map((type, index) => ({
      ...type,
      id: `${type.id}-${Date.now()}-${index}`,
      timestamp: Date.now() - (index * 1000 * 60 * 10)
    }));
    setNotifications(initialNotifications);
  }, []);

  // Navigate between notifications
  const navigateNotification = useCallback((direction) => {
    if (!selectedNotification || isScrolling) return;
    
    const currentIndex = notifications.findIndex(n => n.id === selectedNotification.id);
    let newIndex;
    
    if (direction === 'up') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : notifications.length - 1;
    } else {
      newIndex = currentIndex < notifications.length - 1 ? currentIndex + 1 : 0;
    }
    
    if (newIndex !== currentIndex) {
      setIsScrolling(true);
      setSelectedNotification(null);
      
      setTimeout(() => {
        setSelectedNotification(notifications[newIndex]);
        setCurrentNotificationIndex(newIndex);
        setTimeout(() => setIsScrolling(false), 600);
      }, 150);
    }
  }, [selectedNotification, notifications, isScrolling]);

  // Handle scroll events with improved sensitivity control
  const handleScroll = useCallback((event) => {
    if (!selectedNotification || isScrolling) return;
    
    const now = Date.now();
    const timeSinceLastScroll = now - lastScrollTimeRef.current;
    
    // Much longer cooldown period to reduce sensitivity
    if (timeSinceLastScroll < 800) return;
    
    // Only respond to significant scroll movements
    const deltaY = Math.abs(event.deltaY);
    if (deltaY < 50) return; // Minimum scroll threshold
    
    lastScrollTimeRef.current = now;
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    const direction = event.deltaY > 0 ? 'down' : 'up';
    
    // Longer debounce for more control
    scrollTimeoutRef.current = setTimeout(() => {
      navigateNotification(direction);
    }, 200);
  }, [selectedNotification, navigateNotification, isScrolling]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (!selectedNotification) return;
    
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        navigateNotification('up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        navigateNotification('down');
        break;
      case 'Escape':
        setSelectedNotification(null);
        break;
    }
  }, [selectedNotification, navigateNotification]);

  // Add event listeners
  useEffect(() => {
    if (selectedNotification) {
      // Use passive: false to be able to preventDefault if needed
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
  }, [selectedNotification, handleScroll, handleKeyDown]);

  // Handle clicks outside the stack
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stackRef.current && !stackRef.current.contains(event.target)) {
        if (isExpanded) {
          setIsExpanded(false);
        }
        if (selectedNotification) {
          setSelectedNotification(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, selectedNotification]);

  const handleNotificationClick = (notification, event) => {
    event.stopPropagation();
    if (isExpanded) {
      if (selectedNotification?.id === notification.id) {
        setSelectedNotification(null);
      } else {
        setSelectedNotification(null);
        setTimeout(() => {
          setSelectedNotification(notification);
          setCurrentNotificationIndex(notifications.findIndex(n => n.id === notification.id));
          setIsExpanded(false);
        }, 300);
      }
    } else {
      setIsExpanded(true);
    }
  };

  const handleStackClick = (event) => {
    event.stopPropagation();
    setIsExpanded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Overlay for when a section is open */}
      <AnimatePresence>
        {selectedNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Notification Stack - Always visible, high z-index */}
      <div className="fixed top-0 left-0 right-0 z-[2000] flex justify-center pt-6 pointer-events-none">
        <motion.div ref={stackRef} className="relative pointer-events-auto">
          <div className="relative w-80">
            <AnimatePresence>
              {notifications
                .filter(notification => !selectedNotification || notification.id !== selectedNotification.id)
                .map((notification, index) => {
                  const IconComponent = notification.icon;
                  return (
                    <motion.div
                      key={notification.id}
                      layout
                      layoutId={`notification-${notification.id}`}
                      initial={{ 
                        y: -100,
                        opacity: 0,
                        scale: 0.8,
                        rotateX: -15
                      }}
                      animate={{
                        y: isExpanded ? index * 85 : index * 4,
                        x: isExpanded ? 0 : index * 2,
                        opacity: index < 4 ? 1 : 0,
                        scale: 1 - (index * 0.03),
                        rotateX: isExpanded ? 0 : index * 2,
                        rotateZ: isExpanded ? 0 : index * 1,
                        zIndex: notifications.length - index + 1000,
                        width: 320,
                        height: 70,
                        borderRadius: 16
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
                        filter: `brightness(${1 - index * 0.1})`
                      }}
                      onClick={(e) => handleNotificationClick(notification, e)}
                    >
                      <motion.div
                        layout
                        className={`relative overflow-hidden w-full h-full bg-gradient-to-r ${notification.color} backdrop-blur-md shadow-xl`}
                        style={{ borderRadius: 'inherit' }}
                      >
                        <motion.div
                          layout
                          className="px-4 py-4 flex items-center h-full"
                        >
                          <motion.div
                            layout
                            className="p-3 bg-white/20 rounded-xl mr-4 backdrop-blur-sm flex-shrink-0"
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <motion.h3 
                              layout
                              className="font-semibold text-white truncate text-lg"
                            >
                              {notification.title}
                            </motion.h3>
                            <motion.p 
                              layout
                              className="text-sm text-white/80 truncate"
                            >
                              {notification.subtitle}
                            </motion.p>
                          </div>
                          <motion.div 
                            layout
                            className="text-xs text-white/60 ml-3 flex-shrink-0"
                          >
                            ahora
                          </motion.div>
                        </motion.div>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
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

      {/* Selected Notification Section - Displayed separately */}
      <AnimatePresence mode="wait">
        {selectedNotification && (
          <motion.div
            key={selectedNotification.id}
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 50,
              x: '-50%',
              width: 320,
              height: 70,
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
              y: isScrolling ? (currentNotificationIndex > 0 ? -50 : 50) : 50,
              x: '-50%',
              width: 320,
              height: 70,
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
              className={`relative overflow-hidden w-full h-full bg-gradient-to-r ${selectedNotification.color} backdrop-blur-md shadow-xl`}
            >
              <motion.div
                className="p-8 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm"
                    >
                      {(() => {
                        const IconComponent = selectedNotification.icon;
                        return <IconComponent className="w-8 h-8 text-white" />;
                      })()}
                    </motion.div>
                    <div>
                      <motion.h1 
                        className="text-3xl font-bold text-white"
                      >
                        {selectedNotification.content.title}
                      </motion.h1>
                      <motion.p 
                        className="text-white/80 text-lg"
                      >
                        {selectedNotification.subtitle}
                      </motion.p>
                    </div>
                  </div>
                  
                  {/* Navigation indicators */}
                  <div className="flex items-center space-x-2">
                    <div className="text-white/60 text-sm">
                      {currentNotificationIndex + 1} / {notifications.length}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className={`w-2 h-2 rounded-full ${currentNotificationIndex > 0 ? 'bg-white/60' : 'bg-white/20'}`} />
                      <div className={`w-2 h-2 rounded-full ${currentNotificationIndex < notifications.length - 1 ? 'bg-white/60' : 'bg-white/20'}`} />
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto">
                  {selectedNotification.content.items.map((item, itemIndex) => {
                    const ItemIcon = item.icon;
                    return (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.1 + 0.3 }}
                        className="flex items-center justify-between p-6 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-white/20 rounded-xl">
                            <ItemIcon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-medium text-lg">{item.text}</span>
                        </div>
                        <span className="text-white/60 text-sm font-medium">{item.time}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Indicator */}
      <motion.div 
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-sm bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full z-[2000]"
        animate={{
          opacity: selectedNotification ? 0.8 : 1
        }}
      >
        {selectedNotification ? 'Scroll amplio para navegar • Flechas ↑↓ • ESC para salir' : 
         isExpanded ? 'Click fuera para contraer o elige una notificación' : 
         'Click en el stack para expandir'}
      </motion.div>
    </div>
  );
};

export default Test;