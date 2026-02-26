import { useState } from 'react';

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'verse', label: 'Verse' },
  { id: 'pre-chorus', label: 'Pre-Chorus' },
  { id: 'chorus', label: 'Chorus' },
  { id: 'bridge', label: 'Bridge' },
  { id: 'solo', label: 'Solo' },
  { id: 'breakdown', label: 'Breakdown' },
  { id: 'outro', label: 'Outro' },
  { id: 'drop', label: 'Drop' },
  { id: 'hook', label: 'Hook' },
  { id: 'interlude', label: 'Interlude' },
  { id: 'fade-out', label: 'Fade out' }
];

const StructureTool = () => {
  const [selected, setSelected] = useState([]);
  const [copied, setCopied] = useState(false);

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const output = selected
    .map(id => `[${SECTIONS.find(s => s.id === id)?.label}]\n\n`)
    .join('');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <span className="w-3 h-3 rounded-full bg-teal-500 inline-block" />
        <h2 className="font-bold text-gray-700 tracking-wide uppercase text-sm">
          Outil 2 — Structure des paroles
        </h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <p className="text-sm text-gray-500 mb-4">
          Sélectionne les sections dans l'ordre souhaité
        </p>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => toggle(section.id)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                selected.includes(section.id)
                  ? 'bg-teal-500 border-teal-500 text-white'
                  : 'border-gray-300 text-gray-600 hover:border-teal-300'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {output && (
        <div className="mt-6 rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
            <span className="font-semibold text-gray-700 text-sm">📝 Structure Lyrics</span>
            <button
              onClick={handleCopy}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-teal-500 hover:bg-teal-600 text-white'
              }`}
            >
              {copied ? '✅ Copié !' : '📋 Copier'}
            </button>
          </div>
          <div className="bg-white p-4">
            <pre className="font-mono text-teal-700 text-sm whitespace-pre-wrap">
              {output}
            </pre>
          </div>
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
            <p className="text-xs text-gray-400">
              💡 Colle ce texte dans le champ <strong>"Lyrics"</strong> sur Suno AI
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StructureTool;
