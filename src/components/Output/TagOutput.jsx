import { useState } from 'react';

const TagOutput = ({ output }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output.style);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Erreur lors de la copie');
    }
  };

  if (!output.style) return (
    <div className="mt-8 rounded-xl border border-dashed border-gray-700 p-8 text-center text-gray-600">
      <p className="text-4xl mb-2">🎵</p>
      <p>Sélectionne des tags pour générer ton style Suno</p>
    </div>
  );

  return (
    <div className="mt-8 rounded-xl border border-gray-700 overflow-hidden">
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-200">🎯 Style of Music</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
            output.isValid
              ? 'bg-green-900/50 text-green-400'
              : 'bg-red-900/50 text-red-400'
          }`}>
            {output.charCount}/200
          </span>
          <span className="text-xs text-gray-500">{output.tagCount} tags</span>
        </div>
        <button
          onClick={handleCopy}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-purple-600 hover:bg-purple-500 text-white'
          }`}
        >
          {copied ? '✅ Copié !' : '📋 Copier'}
        </button>
      </div>

      <div className="bg-gray-900 p-4">
        <p className="font-mono text-purple-300 leading-relaxed break-words text-lg">
          {output.style}
        </p>
      </div>

      {output.warning && (
        <div className="bg-yellow-900/20 border-t border-yellow-800/50 px-4 py-2">
          <p className="text-yellow-400 text-xs">⚠️ {output.warning}</p>
        </div>
      )}

      <div className="bg-gray-800/50 border-t border-gray-700 px-4 py-3">
        <p className="text-xs text-gray-500">
          💡 Colle ce texte dans le champ{' '}
          <strong className="text-gray-400">"Style of Music"</strong> sur Suno AI
        </p>
      </div>
    </div>
  );
};

export default TagOutput;
