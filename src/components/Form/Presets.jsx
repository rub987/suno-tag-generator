import { PRESETS } from '../../data/presets';

const colorMap = {
  cyan:    { card: 'border-brand-cyan/30 hover:border-brand-cyan/60 hover:bg-brand-cyan/5',    badge: 'bg-brand-cyan/10 text-brand-cyan' },
  magenta: { card: 'border-brand-magenta/30 hover:border-brand-magenta/60 hover:bg-brand-magenta/5', badge: 'bg-brand-magenta/10 text-brand-magenta' },
  blue:    { card: 'border-brand-blue/30 hover:border-brand-blue/60 hover:bg-brand-blue/5',    badge: 'bg-brand-blue/10 text-brand-blue' },
  red:     { card: 'border-red-500/30 hover:border-red-500/60 hover:bg-red-500/5',             badge: 'bg-red-500/10 text-red-400' },
  yellow:  { card: 'border-yellow-400/30 hover:border-yellow-400/60 hover:bg-yellow-400/5',   badge: 'bg-yellow-400/10 text-yellow-400' },
  orange:  { card: 'border-orange-400/30 hover:border-orange-400/60 hover:bg-orange-400/5',   badge: 'bg-orange-400/10 text-orange-400' },
  purple:  { card: 'border-purple-400/30 hover:border-purple-400/60 hover:bg-purple-400/5',   badge: 'bg-purple-400/10 text-purple-300' },
};

const Presets = ({ onApply, activePresetId }) => {
  return (
    <div className="mb-6">
      <p className="text-xs text-white/30 font-semibold uppercase tracking-widest mb-3">
        ⚡ Démarrage rapide
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {PRESETS.map(preset => {
          const colors = colorMap[preset.color] || colorMap.cyan;
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onApply(preset)}
              className={`flex-shrink-0 border rounded-2xl px-4 py-3 text-left transition-all duration-200
                          min-w-[130px] ${colors.card} ${
                isActive ? 'ring-1 ring-offset-0 ring-white/20 bg-white/5' : ''
              }`}
            >
              <div className="text-xl mb-1.5">{preset.emoji}</div>
              <div className="text-white text-xs font-bold mb-2 leading-tight">{preset.name}</div>
              <div className="flex flex-wrap gap-1">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${colors.badge}`}>
                  {preset.selections.genres}
                </span>
                {preset.selections.moods.slice(0, 1).map(m => (
                  <span key={m} className="text-[10px] px-1.5 py-0.5 rounded-md font-medium bg-white/10 text-white/50">
                    {m}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Presets;
