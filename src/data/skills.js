// Importar los íconos específicos de React Icons
import { 
  SiNodedotjs, 
  SiExpress, 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiMysql, 
  SiPostgresql, 
  SiMongodb, 
  SiDocker, 
  SiGit, 
  SiJest 
} from 'react-icons/si';
import { FaAws } from "react-icons/fa";

const mainSkills = [
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express.js', icon: SiExpress },
  { name: 'React.js', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'MySQL', icon: SiMysql },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Docker', icon: SiDocker },
  { name: 'AWS', icon: FaAws  },
  { name: 'Git', icon: SiGit },
  { name: 'Jest', icon: SiJest },
];

const softSkills = [
  'Resolución de problemas',
  'Comunicación efectiva',
  'Trabajo en equipo',
  'Autoaprendizaje',
  'Adaptabilidad',
  'Atención al detalle',
];

const languages = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "B2" },
];

export { mainSkills, softSkills, languages };