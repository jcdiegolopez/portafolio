
import SectionHeading from '../common/SectionHeading';
import { motion} from 'motion/react'
import { education, certifications } from '../../data/education';

const Education = () => {


  return (
    <section id="education" className="py-16 px-8 md:px-0">
      <div className="max-w-5xl mx-auto">
        <SectionHeading 
          title="Educación" 
          subtitle="Formación académica y certificaciones" 
        />
        
        <div className="mt-16 grid md:grid-cols-2 gap-12">
          {/* Education Column */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}>
            <h3 
              className={`text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-700`}
            >
              Formación Académica
            </h3>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className={`bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 shadow-lg shadow-blue-900/5 transition-all duration-700 hover:border-blue-700/30 `}
                  style={{ transitionDelay: `${index * 200 + 200}ms` }}
                >
                  <h4 className="text-lg font-semibold text-zinc-200">{edu.degree}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-blue-400">{edu.institution}</span>
                    <span className="text-sm text-zinc-400">{edu.period}</span>
                  </div>
                  
                  <p className="mt-4 text-zinc-300">{edu.description}</p>
                  
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-zinc-300 mb-2">Logros:</h5>
                      <ul className="space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <li 
                            key={idx}
                            className={`flex items-start text-zinc-400 text-sm transition-all duration-500`}
                            style={{ transitionDelay: `${index * 200 + idx * 100 + 400}ms` }}
                          >
                            <div className="text-purple-400 mt-1 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Certifications Column */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}>
            <h3 
              className={`text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 transition-all duration-700 `}
              style={{ transitionDelay: `200ms` }}
            >
              Certificaciones
            </h3>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 transition-all duration-500 hover:border-purple-700/30 `}
                  style={{ transitionDelay: `${index * 150 + 400}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.issuer}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="text-lg font-bold text-blue-400">{cert.issuer[0]}</div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-zinc-200">{cert.title}</h4>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-purple-400">{cert.issuer}</span>
                      <span className="text-zinc-400">{cert.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;