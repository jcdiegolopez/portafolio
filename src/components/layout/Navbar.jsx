import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', href: '#home' },
    { label: 'Sobre mí', href: '#about' },
    { label: 'Experiencia', href: '#experience' },
    { label: 'Educación', href: '#education' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Contacto', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-zinc-900/80 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="text-2xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Diego López
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/assets/docs/cv_backend.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              Descargar CV
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-900/95 backdrop-blur-md shadow-lg py-4 px-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-zinc-300 hover:text-white py-2 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/assets/cv-diego-lopez.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 text-center"
            >
              Descargar CV
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;