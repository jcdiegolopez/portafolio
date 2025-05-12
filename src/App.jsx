import { useState, useEffect } from 'react';
import AppLayout from './components/layout/AppLayout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AppLayout>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Contact />
    </AppLayout>
  );
}

export default App;