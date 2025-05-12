import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import  experiences from '../../data/experience';

const Experience = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  

  return (
    <section id="experience" ref={sectionRef} className="py-16">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Experiencia"
          subtitle="Mi trayectoria profesional"
        />

        <div className="mt-16 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative md:pl-10">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hidden md:block" />

              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-2 top-5 w-px h-full bg-zinc-700 -translate-x-1/2 hidden md:block" />
              )}

              {/* Grupo 1: Encabezado (Título, Empresa, Período) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ duration: 1, delay: index * 0.6 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-100">
                      {exp.title}
                    </h3>
                    <h4 className="text-blue-400 font-medium">
                      {exp.company}
                    </h4>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="text-sm bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Grupo 2: Descripción y Logros */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ duration: 1, delay: index * 0.6 + 0.4 }}
              >
                <p className="text-zinc-400 mb-4">{exp.description}</p>

                <h5 className="text-zinc-200 font-medium mb-2">
                  Logros Destacados:
                </h5>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start text-zinc-300">
                      <div className="text-blue-400 mt-1 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Grupo 3: Habilidades */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ duration: 1, delay: index * 0.6 + 0.8 }}
              >
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px GarrisonMedium-2 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
