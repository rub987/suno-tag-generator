import { useState } from 'react';
import { useTags } from './hooks/useTags';
import { generateFullOutput } from './utils/tagGenerator';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import StyleTool from './components/Tools/StyleTool';
import StructureTool from './components/Tools/StructureTool';

const App = () => {
  const { tags, loading, source, forceRefresh } = useTags();
  const [activeTab, setActiveTab] = useState('style');
  const [selections, setSelections] = useState({
    genres: null,
    moods: [],
    instruments: [],
    vocals: null,
    tempo: null,
    production: []
  });
  const [customTags, setCustomTags] = useState('');
  const output = generateFullOutput(selections, customTags);

  const handleToggle = (category, tagLabel, multiple) => {
    setSelections(prev => {
      if (multiple) {
        const current = Array.isArray(prev[category]) ? prev[category] : [];
        return {
          ...prev,
          [category]: current.includes(tagLabel)
            ? current.filter(t => t !== tagLabel)
            : [...current, tagLabel]
        };
      }
      return {
        ...prev,
        [category]: prev[category] === tagLabel ? null : tagLabel
      };
    });
  };

  const handleReset = () => {
    setSelections({ genres: null, moods: [], instruments: [], vocals: null, tempo: null, production: [] });
    setCustomTags('');
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-brand-cyan border-t-transparent
                        rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/50 text-sm">Chargement des tags...</p>
      </div>
    </div>
  );

  return (
    <>
      <Header onRefresh={forceRefresh} />

      <main className="max-w-3xl mx-auto px-4 py-10">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/20
                          text-brand-cyan text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse inline-block" />
            Optimisé pour Suno AI v5
          </div>
          <h2 className="text-4xl font-black text-white mb-3 leading-tight">
            Génère ton{' '}
            <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">
              Style of Music
            </span>
          </h2>
          <p className="text-white/50 text-base">
            Sélectionne tes tags et copie directement dans Suno AI
          </p>
        </div>

        {/* Info Banner */}
        <div className="glass-card p-4 mb-8 flex items-start gap-3">
          <span className="text-brand-cyan text-lg mt-0.5">💡</span>
          <p className="text-white/70 text-sm leading-relaxed">
            <strong className="text-white">Suno AI utilise 2 champs distincts.</strong>{' '}
            Cet outil génère le contenu pour chacun séparément.
            Utilise les deux onglets dans l'ordre.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            {
              id: 'style',
              icon: '🎨',
              title: 'Outil 1 — Style',
              desc: 'Genre, ambiance, instruments, voix, tempo',
              field: 'Style of Music',
              color: 'cyan'
            },
            {
              id: 'structure',
              icon: '📝',
              title: 'Outil 2 — Structure',
              desc: 'Squelette de tes paroles section par section',
              field: 'Lyrics',
              color: 'magenta'
            }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? tab.color === 'cyan'
                    ? 'border-brand-cyan/50 bg-brand-cyan/10 shadow-lg shadow-brand-cyan/10'
                    : 'border-brand-magenta/50 bg-brand-magenta/10 shadow-lg shadow-brand-magenta/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="text-2xl mb-2">{tab.icon}</div>
              <div className={`font-bold text-sm mb-1 ${
                activeTab === tab.id
                  ? tab.color === 'cyan' ? 'text-brand-cyan' : 'text-brand-magenta'
                  : 'text-white'
              }`}>
                {tab.title}
              </div>
              <div className="text-xs text-white/40 mb-2">{tab.desc}</div>
              <div className={`text-xs font-semibold ${
                tab.color === 'cyan' ? 'text-brand-cyan/70' : 'text-brand-magenta/70'
              }`}>
                → Champ "{tab.field}"
              </div>
            </button>
          ))}
        </div>

        {/* Tool Content */}
        {activeTab === 'style' && (
          <StyleTool
            tags={tags}
            selections={selections}
            customTags={customTags}
            onToggle={handleToggle}
            onCustomTagsChange={setCustomTags}
            onReset={handleReset}
            output={output}
          />
        )}

        {activeTab === 'structure' && (
          <StructureTool />
        )}

      </main>

      <Footer />
    </>
  );
};

export default App;
