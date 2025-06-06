const TechBadge = ({ name, icon: Icon, delay }) => {
  return (
    <div 
      className={`flex items-center gap-2 p-1.5 bg-zinc-800/50 rounded-lg border border-zinc-700/50 transition-all duration-500 hover:border-blue-500/50 hover:bg-zinc-800/80 
        'opacity-100 translate-y-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-5 h-5 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-md text-zinc-200">
      
        {Icon ? (
          <Icon className="w-4 h-4 text-zinc-200" />
        ) : (
          <div className="text-xs font-semibold">{name ? name.charAt(0) : ''}</div>
        )}
      </div>
      <span className="text-sm text-zinc-300">{name}</span>
    </div>
  );
};

export default TechBadge;