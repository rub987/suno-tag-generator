import { useState } from 'react';
import { useLang } from '../../contexts/LangContext';

const SECTIONS = [
  { id: 'intro',      label: 'Intro' },
  { id: 'verse',      label: 'Verse' },
  { id: 'pre-chorus', label: 'Pre-Chorus' },
  { id: 'chorus',     label: 'Chorus' },
  { id: 'bridge',     label: 'Bridge' },
  { id: 'solo',       label: 'Solo' },
  { id: 'breakdown',  label: 'Breakdown' },
  { id: 'outro',      label: 'Outro' },
  { id: 'drop',       label: 'Drop' },
  { id: 'hook',       label: 'Hook' },
  { id: 'interlude',  label: 'Interlude' },
  { id: 'fade-out',   label: 'Fade out' }
];

const StructureTool = () => {
  const [selected, setSelected] = useState([]);
  const [copied, setCopied] = useState(false);
  const { t } = useLang();

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
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
        <span className="w-2 h-2 rounded-full bg-brand-magenta animate-pulse inline-block" />
        <h2 className="section-title">{t('structure.title')}</h2>
      </div>

      <div className="glass-card p-5">
        <p className="text-sm text-white/40 mb-4">{t('structure.subtitle')}</p>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => toggle(section.id)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                selected.includes(section.id)
                  ? 'bg-brand-magenta/20 border-brand-magenta/50 text-brand-magenta shadow-lg shadow-brand-magenta/20'
                  : 'border-white/20 bg-white/5 text-white/60 hover:border-brand-magenta/30 hover:text-white'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {output && (
        <div className="mt-6 rounded-2xl border border-brand-magenta/30 overflow-hidden
                        shadow-xl shadow-brand-magenta/10">
          <div className="bg-brand-magenta/10 px-5 py-3 flex items-center justify-between
                          border-b border-brand-magenta/20">
            <span className="font-bold text-brand-magenta text-sm">{t('structure.output')}</span>
            <button
              onClick={handleCopy}
              className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${
                copied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-brand-magenta/20 hover:bg-brand-magenta/30 text-brand-magenta border border-brand-magenta/30'
              }`}
            >
              {copied ? t('structure.copied') : t('structure.copy')}
            </button>
          </div>
          <div className="bg-black/30 p-5">
            <pre className="font-mono text-brand-magenta text-sm whitespace-pre-wrap">
              {output}
            </pre>
          </div>
          <div className="bg-white/5 border-t border-white/10 px-5 py-3">
            <p className="text-xs text-white/30">
              {t('structure.hint')}{' '}
              <strong className="text-brand-magenta/70">"Lyrics"</strong>{' '}
              {t('structure.hint.post')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StructureTool;
