
import {  useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import TechBadge from '../common/TechBadge';
import { mainSkills, softSkills } from '../../data/skills';

const About = () => {
  const sectionRef = useRef(null);
 
  return (
    <section id="about" ref={sectionRef} className="py-16 px-8 md:px-0">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Sobre mí"
          subtitle="Conoce mi perfil profesional"
        />

        <div className="mt-16 grid md:grid-cols-2 gap-12">
          {/* Grupo 1: Biografía (Perfil Profesional e Información Personal) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
             { opacity: 1, y: 0 }
            }
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Perfil Profesional
            </h3>
            <div className="space-y-4 text-zinc-300">
              <p>
                Soy un <span className="text-blue-400">Desarrollador Backend</span> 
                especializado en crear soluciones eficientes, seguras y escalables. 
                Me enfoco en el desarrollo de APIs robustas, sistemas de autenticación 
                y arquitecturas basadas en microservicios.
              </p>
              <p>
                Aunque mi enfoque principal es el backend, cuento con experiencia práctica en el 
                <span className="text-purple-400"> desarrollo frontend</span>, lo que me permite 
                colaborar de forma integral en equipos full stack y entender a profundidad el ciclo 
                completo del desarrollo de software.
              </p>
              <p>
                Me caracteriza un pensamiento analítico orientado a resolver problemas complejos, 
                optimizar procesos y mantener un código limpio y mantenible. 
                Estoy en constante formación para aplicar las mejores prácticas y tecnologías actuales.
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3 text-zinc-100">
                Información Personal
              </h4>
              <ul className="space-y-2 text-zinc-300">
                <li className="flex items-center">
                  <span className="font-medium text-zinc-400 w-28">
                    Ubicación:
                  </span>
                  <span>Guatemala (GTM -6)</span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium text-zinc-400 w-28">Email:</span>
                  <a
                    href="mailto:dijolopez@gmail.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    dijolopez@gmail.com
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="font-medium text-zinc-400 w-28">
                    Teléfono:
                  </span>
                  <a
                    href="tel:+50257014021"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    +502 5701-4021
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="font-medium text-zinc-400 w-28">
                    Idiomas:
                  </span>
                  <span>Español (nativo), Inglés (B2)</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Grupo 2: Habilidades Técnicas */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
              { opacity: 1, y: 0 } 
            }
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Habilidades Técnicas
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {mainSkills.map((skill, index) => (
                <TechBadge
                  key={index}
                  name={skill.name}
                  icon={skill.icon}
                  delay={index * 100}
                />
              ))}
            </div>
          </motion.div>

          {/* Grupo 3: Habilidades Blandas */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
             { opacity: 1, y: 0 } 
            }
            transition={{ duration: 1, delay: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Habilidades Blandas
            </h3>

            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
