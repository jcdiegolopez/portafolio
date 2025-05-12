
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import TechBadge from '../common/TechBadge';

const About = () => {
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
      { threshold: 0.2 }
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

  const mainSkills = [
    { name: 'Node.js', icon: '/assets/icons/nodejs.svg' },
    { name: 'Express.js', icon: '/assets/icons/express.svg' },
    { name: 'React.js', icon: '/assets/icons/react.svg' },
    { name: 'Next.js', icon: '/assets/icons/nextjs.svg' },
    { name: 'TypeScript', icon: '/assets/icons/typescript.svg' },
    { name: 'MySQL', icon: '/assets/icons/mysql.svg' },
    { name: 'PostgreSQL', icon: '/assets/icons/postgresql.svg' },
    { name: 'MongoDB', icon: '/assets/icons/mongodb.svg' },
    { name: 'Docker', icon: '/assets/icons/docker.svg' },
    { name: 'AWS', icon: '/assets/icons/aws.svg' },
    { name: 'Git', icon: '/assets/icons/git.svg' },
    { name: 'Jest', icon: '/assets/icons/jest.svg' },
  ];

  const softSkills = [
    'Resolución de problemas',
    'Comunicación efectiva',
    'Trabajo en equipo',
    'Autoaprendizaje',
    'Adaptabilidad',
    'Atención al detalle',
  ];

  return (
    <section id="about" ref={sectionRef} className="py-16">
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
              isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
            }
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Perfil Profesional
            </h3>
            <div className="space-y-4 text-zinc-300">
              <p>
                Soy un{' '}
                <span className="text-blue-400">Desarrollador Backend</span>{' '}
                enfocado en crear soluciones tecnológicas eficientes y escalables.
                Mi experiencia se centra en el desarrollo de APIs robustas,
                sistemas de autenticación seguros y arquitecturas orientadas a
                microservicios.
              </p>
              <p>
                Actualmente, estoy ampliando mis habilidades hacia el{' '}
                <span className="text-purple-400">desarrollo frontend</span>,
                integrando interfaces interactivas con lógica de negocio sólida,
                lo que me permite tener una visión más integral de los proyectos.
              </p>
              <p>
                Mi enfoque técnico y analítico me permite resolver problemas
                complejos, optimizar procesos y mejorar continuamente la calidad
                del código. Estoy en constante aprendizaje para mantenerme
                actualizado con las últimas tecnologías y mejores prácticas.
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
              isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
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
                  isVisible={isVisible}
                />
              ))}
            </div>
          </motion.div>

          {/* Grupo 3: Habilidades Blandas */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
              isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
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
