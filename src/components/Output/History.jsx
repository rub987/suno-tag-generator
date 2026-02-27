import { useState } from 'react';

const formatRelativeTime = (timestamp) => {
  const diff = Date.now() - timestamp;
  const min = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  if (h < 24) return `il y a ${h}h`;
  return `il y a ${d}j`;
};

const History = ({ history, onRemove, onClear }) => {
  const [open, setOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (entry) => {
    await navigator.clipboard.writeText(entry.style);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (history.length === 0) return null;

  return (
    <div className="mt-6 glass-card overflow-hidden">

      {/* Toggle header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-5 py-3.5 flex items-center justify-between
                   hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-white/50 text-sm">🕐</span>
          <span className="text-sm font-semibold text-white/70">Historique</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/40 font-mono">
            {history.length}
          </span>
        </div>
        <span className={`text-white/30 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Entries */}
      {open && (
        <div className="border-t border-white/10">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="px-5 py-3.5 border-b border-white/5 last:border-0
                         hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-white/60 leading-relaxed break-all line-clamp-2">
                    {entry.style}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-white/25">{formatRelativeTime(entry.timestamp)}</span>
                    <span className="text-[10px] text-white/20">·</span>
                    <span className="text-[10px] text-white/25">{entry.tagCount} tags</span>
                    <span className="text-[10px] text-white/20">·</span>
                    <span className="text-[10px] text-white/25">{entry.charCount} chars</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleCopy(entry)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      copiedId === entry.id
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-brand-cyan/10 text-brand-cyan/70 hover:bg-brand-cyan/20 hover:text-brand-cyan'
                    }`}
                  >
                    {copiedId === entry.id ? '✓' : '📋'}
                  </button>
                  <button
                    onClick={() => onRemove(entry.id)}
                    className="px-2 py-1 rounded-lg text-xs text-white/20
                               hover:bg-red-500/10 hover:text-red-400 transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Clear all */}
          <div className="px-5 py-2.5 flex justify-end">
            <button
              onClick={onClear}
              className="text-[11px] text-white/20 hover:text-red-400 transition-colors"
            >
              🗑️ Tout effacer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
