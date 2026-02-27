import { useState } from 'react';
import { useTags } from './hooks/useTags';
import { generateFullOutput } from './utils/tagGenerator';
import { LangProvider, useLang } from './contexts/LangContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import StyleTool from './components/Tools/StyleTool';
import StructureTool from './components/Tools/StructureTool';

const AppInner = () => {
  const { tags, loading, forceRefresh } = useTags();
  const { t } = useLang();
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
  const [activePresetId, setActivePresetId] = useState(null);
  const output = generateFullOutput(selections, customTags);

  const handleApplyPreset = (preset) => {
    setSelections(preset.selections);
    setCustomTags('');
    setActivePresetId(preset.id);
  };

  const handleToggle = (category, tagLabel, multiple) => {
    setActivePresetId(null);
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
    setActivePresetId(null);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-brand-cyan border-t-transparent
                        rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/50 text-sm">{t('loading')}</p>
      </div>
    </div>
  );

  const TABS = [
    {
      id: 'style',
      icon: '🎨',
      title: t('tabs.style.title'),
      desc: t('tabs.style.desc'),
      field: 'Style of Music',
      color: 'cyan'
    },
    {
      id: 'structure',
      icon: '📝',
      title: t('tabs.structure.title'),
      desc: t('tabs.structure.desc'),
      field: 'Lyrics',
      color: 'magenta'
    }
  ];

  return (
    <>
      <Header onRefresh={forceRefresh} />

      <main className="max-w-3xl mx-auto px-4 py-10">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/20
                          text-brand-cyan text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse inline-block" />
            {t('hero.badge')}
          </div>
          <h2 className="text-4xl font-black text-white mb-3 leading-tight">
            {t('hero.title')}{' '}
            <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">
              Style of Music
            </span>
          </h2>
          <p className="text-white/50 text-base">{t('hero.subtitle')}</p>
        </div>

        {/* Info Banner */}
        <div className="glass-card p-4 mb-8 flex items-start gap-3">
          <span className="text-brand-cyan text-lg mt-0.5">💡</span>
          <p className="text-white/70 text-sm leading-relaxed">
            <strong className="text-white">{t('banner.bold')}</strong>{' '}
            {t('banner.text')}
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {TABS.map(tab => (
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
                → {tab.field}
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
            onApplyPreset={handleApplyPreset}
            activePresetId={activePresetId}
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

const App = () => (
  <LangProvider>
    <AppInner />
  </LangProvider>
);

export default App;
