import { motion } from 'motion/react';

const SectionCard = ({ section, index, isExpanded, isSelected, onClick }) => {
  const IconComponent = section.icon;
  return (
    <motion.div
      key={section.id}
      layout
      layoutId={`section-${section.id}`}
      initial={{ y: -100, opacity: 0, scale: 0.8, rotateX: -15 }}
      animate={{
        y: isExpanded ? index * 75 : index * 3,
        x: isExpanded ? 0 : index * 1.5,
        opacity: index < 6 ? 1 : 0,
        scale: 1 - (index * 0.025),
        rotateX: isExpanded ? 0 : index * 1.5,
        rotateZ: isExpanded ? 0 : index * 0.5,
        zIndex: 1000 - index,
        width: 288,
        height: 60,
        borderRadius: 12
      }}
      exit={{ y: -50, opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
      transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.8 }}
      className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer shadow-2xl"
      style={{ transformOrigin: 'center top', filter: `brightness(${1 - index * 0.08})` }}
      onClick={onClick}
    >
      <motion.div
        layout
        className={`relative overflow-hidden w-full h-full bg-gradient-to-r ${section.color} backdrop-blur-md shadow-xl border border-zinc-700/30`}
        style={{ borderRadius: 'inherit' }}
      >
        <motion.div layout className="px-3 py-3 flex items-center h-full">
          <motion.div
            layout
            className="p-2 bg-white/10 rounded-lg mr-3 backdrop-blur-sm flex-shrink-0 border border-white/20"
          >
            <IconComponent className="w-5 h-5 text-white" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <motion.h3 layout className="font-semibold text-white truncate text-base">
              {section.title}
            </motion.h3>
            <motion.p layout className="text-xs text-white/70 truncate">
              {section.subtitle}
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
};
export default SectionCard;