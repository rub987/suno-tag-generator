import { useState } from 'react';

const TagOutput = ({ output }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output.style);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!output.style) return (
    <div className="mt-6 rounded-2xl border-2 border-dashed border-white/10 p-10 text-center">
      <p className="text-4xl mb-3">🎵</p>
      <p className="text-white/30 text-sm">Sélectionne des tags pour générer ton style</p>
    </div>
  );

  return (
    <div className="mt-6 rounded-2xl border border-brand-cyan/30 overflow-hidden
                    shadow-xl shadow-brand-cyan/10">

      {/* Header */}
      <div className="bg-brand-cyan/10 px-5 py-3 flex items-center justify-between
                      border-b border-brand-cyan/20">
        <div className="flex items-center gap-3">
          <span className="font-bold text-brand-cyan text-sm">🎯 Style of Music</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${
            output.isValid
              ? 'bg-green-500/10 text-green-400 border-green-500/20'
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            {output.charCount}/200
          </span>
          <span className="text-xs text-white/30">{output.tagCount} tags</span>
        </div>
        <button
          onClick={handleCopy}
          className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${
            copied
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan border border-brand-cyan/30'
          }`}
        >
          {copied ? '✅ Copié !' : '📋 Copier'}
        </button>
      </div>

      {/* Output text */}
      <div className="bg-black/30 p-5">
        <p className="font-mono text-brand-cyan leading-relaxed break-words text-base">
          {output.style}
        </p>
      </div>

      {/* Warning */}
      {output.warning && (
        <div className="bg-yellow-500/10 border-t border-yellow-500/20 px-5 py-2">
          <p className="text-yellow-400 text-xs">⚠️ {output.warning}</p>
        </div>
      )}

      {/* Hint */}
      <div className="bg-white/5 border-t border-white/10 px-5 py-3">
        <p className="text-xs text-white/30">
          💡 Colle dans{' '}
          <strong className="text-brand-cyan/70">"Style of Music"</strong>
          {' '}sur Suno AI · Custom mode
        </p>
      </div>
    </div>
  );
};

export default TagOutput;
