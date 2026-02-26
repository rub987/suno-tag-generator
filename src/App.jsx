import { useState } from 'react';
import { useTags } from './hooks/useTags';
import { generateFullOutput } from './utils/tagGenerator';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import TagSelector from './components/Form/TagSelector';
import TagOutput from './components/Output/TagOutput';

const App = () => {
  const { tags, loading, source, forceRefresh } = useTags();

  const [selections, setSelections] = useState({
    genre: null,
    moods: [],
    instruments: [],
    vocals: null,
    tempo: null,
    production: []
  });

  const [customTags, setCustomTags] = useState('');

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
    setSelections({
      genre: null,
      moods: [],
      instruments: [],
      vocals: null,
      tempo: null,
      production: []
    });
    setCustomTags('');
  };

  const output = generateFullOutput(selections, customTags);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Chargement des tags...</p>
      </div>
    </div>
  );

  return (
    <>
      <Header version={tags?.version} source={source} onRefresh={forceRefresh} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <p className="text-gray-400 text-lg">
            Génère des meta-tags optimisés pour{' '}
            <strong className="text-purple-400">Suno AI</strong>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Dernière mise à jour des tags : {tags?.lastUpdated}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          {Object.entries(tags?.categories || {}).map(([key, categoryData]) => (
            <TagSelector
              key={key}
              category={key}
              categoryData={categoryData}
              selected={selections[key]}
              onToggle={handleToggle}
            />
          ))}

          <div className="mb-6">
            <label className="block font-semibold text-gray-200 mb-2">
              ✏️ Tags personnalisés (séparés par virgules)
            </label>
            <input
              type="text"
              placeholder="ex: cinematic, epic, 80s style..."
              value={customTags}
              onChange={e => setCustomTags(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg
                         text-white placeholder-gray-500 focus:outline-none
                         focus:border-purple-500 transition-colors"
            />
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-3 border border-gray-600 rounded-xl
                       text-gray-400 hover:text-white hover:border-gray-400
                       transition-all font-medium"
          >
            🗑️ Reset
          </button>
        </div>

        <TagOutput output={output} />

        <div className="mt-6 flex items-center gap-6 text-xs text-gray-600">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" />
            Tag confirmé
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-800 inline-block" />
            Tag non confirmé officiellement
          </span>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;