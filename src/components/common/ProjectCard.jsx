import { motion } from 'framer-motion';
import TechBadge from './TechBadge';
import { MdOpenInNew } from 'react-icons/md';

const ProjectCard = ({ project, index = 0 }) => {
  const { title, description, image, technologies, githubUrl, liveUrl } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={ { opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.2 }}
      className="h-full flex flex-col bg-zinc-900/30 rounded-lg border border-zinc-800/50 transition-all duration-500 hover:border-blue-800/50 min-h-[450px]"
    >
   
      <div className="relative overflow-hidden h-48 sm:h-56 flex-shrink-0 rounded-t-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent z-10"></div>
        <img
          src={image || '/assets/img/placeholder_image.png'}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
        />
      </div>

 
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-semibold text-zinc-100 mb-2">{title}</h3>

        <p className="text-zinc-400 text-sm mb-4 flex-grow">{description}</p>

      
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <TechBadge
                key={i}
                name={tech}
                delay={index * 200 + i * 100 + 300}
              />
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50 transition-all duration-300 hover:bg-blue-800/70 hover:text-blue-100 hover:scale-105 hover:shadow-glow 
                 'opacity-100 scale-100' 
              }`}
              style={{ transitionDelay: `${index * 200 + 500}ms` }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {liveUrl && liveUrl !== '' && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center text-sm px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-800/50 transition-all duration-300 hover:bg-purple-800/70 hover:text-purple-100 hover:scale-105 hover:shadow-glow 
                 'opacity-100 scale-100'
              }`}
              style={{ transitionDelay: `${index * 200 + 600}ms` }}
            >
              <MdOpenInNew />
              Ver proyecto
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;