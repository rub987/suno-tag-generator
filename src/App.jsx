// src/App.jsx
import { useState } from 'react';
import { useTags } from './hooks/useTags';
import { generateFullOutput } from './utils/tagGenerator';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import StyleTool from './components/Tools/StyleTool';
import StructureTool from './components/Tools/StructureTool';
import TagOutput from './components/Output/TagOutput';

const App = () => {
  const { tags, loading, source, forceRefresh } = useTags();
  const [activeTab, setActiveTab] = useState('style');
  const [selections, setSelections] = useState({
    genre: null,
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
        const current = prev[category] || [];
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
    setSelections({ genre: null, moods: [], instruments: [], vocals: null, tempo: null, production: [] });
    setCustomTags('');
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Chargement des tags...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50">
      <Header onRefresh={forceRefresh} />

      <main className="max-w-3xl mx-auto px-4 py-8">

        {/* Info Banner */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-8">
          <p className="text-gray-700 text-sm">
            <strong>Suno AI utilise 2 champs distincts.</strong>{' '}
            Cet outil génère le contenu pour chacun d'eux séparément.
            Utilise les deux onglets ci-dessous dans l'ordre.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setActiveTab('style')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              activeTab === 'style'
                ? 'border-teal-500 bg-white shadow-md'
                : 'border-gray-200 bg-white/50 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-2">🎨</div>
            <div className="font-bold text-gray-800">Outil 1 — Style</div>
            <div className="text-xs text-gray-500 mt-1">Genre, ambiance, instruments, voix, tempo</div>
            <div className="text-xs text-teal-600 mt-2 font-medium">→ Champ "Style of Music"</div>
          </button>

          <button
            onClick={() => setActiveTab('structure')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              activeTab === 'structure'
                ? 'border-teal-500 bg-white shadow-md'
                : 'border-gray-200 bg-white/50 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="font-bold text-gray-800">Outil 2 — Structure</div>
            <div className="text-xs text-gray-500 mt-1">Construit le squelette de tes paroles section par section</div>
            <div className="text-xs text-teal-600 mt-2 font-medium">→ Champ "Lyrics"</div>
          </button>
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
    </div>
  );
};

export default App;
