import { useState } from 'react';
import TagSelector from '../Form/TagSelector';
import TagOutput from '../Output/TagOutput';
import Presets from '../Form/Presets';
import History from '../Output/History';
import { useHistory } from '../../hooks/useHistory';
import { useLang } from '../../contexts/LangContext';
import { generateRandomStyle } from '../../utils/randomStyle';

const StyleTool = ({ tags, selections, customTags, onToggle, onCustomTagsChange, onReset, onApplyPreset, activePresetId, output }) => {

  const [generated, setGenerated] = useState(false);
  const [rolling, setRolling] = useState(false);
  const { history, addEntry, removeEntry, clearHistory } = useHistory();
  const { t } = useLang();

  const totalSelected = [
    selections.genres ? 1 : 0,
    (selections.moods?.length || 0),
    (selections.instruments?.length || 0),
    selections.vocals ? 1 : 0,
    selections.tempo ? 1 : 0,
    (selections.production?.length || 0),
    (selections.effects?.length || 0),
    (selections.soundfx?.length || 0)
  ].reduce((a, b) => a + b, 0);

  const getButtonLabel = () => {
    if (totalSelected === 0 && !customTags) return t('style.btn.empty');
    if (totalSelected <= 2) return t('style.btn.few');
    return t('style.btn.ready');
  };

  const handleGenerate = () => {
    if (totalSelected === 0 && !customTags) return;
    setGenerated(true);
    setTimeout(() => {
      document.getElementById('output-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleReset = () => {
    onReset();
    setGenerated(false);
  };

  const handleApplyPreset = (preset) => {
    onApplyPreset(preset);
    setGenerated(false);
  };

  const handleRandom = () => {
    const randomSelections = generateRandomStyle(tags);
    if (!randomSelections) return;
    setRolling(true);
    setTimeout(() => setRolling(false), 600);
    onApplyPreset({ id: null, selections: randomSelections });
    setGenerated(true);
    setTimeout(() => {
      document.getElementById('output-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 150);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse inline-block" />
        <h2 className="section-title">{t('style.title')}</h2>
      </div>

      {/* Presets */}
      <Presets onApply={handleApplyPreset} activePresetId={activePresetId} />

      {/* Random button */}
      <button
        onClick={handleRandom}
        className="w-full mb-6 py-3 px-4 rounded-2xl border border-dashed border-white/20
                   hover:border-brand-cyan/40 hover:bg-brand-cyan/5
                   flex items-center justify-center gap-2 transition-all duration-200 group"
      >
        <span className={`text-lg transition-transform duration-300 ${rolling ? 'rotate-[360deg]' : 'group-hover:rotate-12'}`}
              style={{ display: 'inline-block', transition: rolling ? 'transform 0.6s ease' : undefined }}>
          🎲
        </span>
        <span className="text-sm font-semibold text-white/40 group-hover:text-white/70 transition-colors">
          {t('style.random.btn')}
        </span>
        <span className="text-xs text-white/20 group-hover:text-white/40 transition-colors hidden sm:inline">
          — {t('style.random.hint')}
        </span>
      </button>

      {/* Categories */}
      <div className="space-y-3">
        {Object.entries(tags?.categories || {}).map(([key, categoryData]) => (
          <div key={key} className="glass-card p-5">
            <TagSelector
              category={key}
              categoryData={categoryData}
              selected={selections[key]}
              onToggle={(cat, label, multiple) => {
                setGenerated(false);
                onToggle(cat, label, multiple);
              }}
            />
          </div>
        ))}
      </div>

      {/* Custom Tags */}
      <div className="glass-card p-5 mt-3">
        <label className="block text-sm font-semibold text-brand-cyan mb-1 flex items-center gap-2">
          <span>🖊️</span>
          <span>{t('style.custom.label')}</span>
          <span className="font-normal text-white/30 text-xs">{t('style.custom.opt')}</span>
        </label>
        <input
          type="text"
          placeholder={t('style.custom.ph')}
          value={customTags}
          onChange={e => {
            onCustomTagsChange(e.target.value);
            setGenerated(false);
          }}
          className="w-full mt-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl
                     text-white placeholder-white/30 text-sm focus:outline-none
                     focus:border-brand-cyan/50 transition-colors"
        />
        <p className="text-xs text-white/30 mt-1.5 italic">{t('style.custom.hint')}</p>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={totalSelected === 0 && !customTags}
        className={`mt-6 ${
          totalSelected === 0 && !customTags ? 'btn-primary-disabled' : 'btn-primary'
        }`}
      >
        {getButtonLabel()}
        {totalSelected > 0 && (
          <span className="ml-2 text-sm font-normal opacity-70">
            ({totalSelected} {totalSelected > 1 ? t('style.btn.tags') : t('style.btn.tag')})
          </span>
        )}
      </button>

      {/* Reset */}
      {totalSelected > 0 && (
        <div className="mt-2 flex justify-end">
          <button
            onClick={handleReset}
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            {t('style.reset')}
          </button>
        </div>
      )}

      {/* Output */}
      <div id="output-section">
        {generated && <TagOutput output={output} onSave={addEntry} />}
      </div>

      {/* History */}
      <History history={history} onRemove={removeEntry} onClear={clearHistory} />

      {/* Workflow */}
      <div className="glass-card p-5 mt-8">
        <h3 className="font-bold text-white mb-5 flex items-center gap-2">
          <span>📖</span>
          <span>{t('style.wf.title')}</span>
        </h3>
        <div className="space-y-4">
          {[
            { n: 1, content: <span>{t('style.wf.1')} <Tag color="cyan">Style of Music</Tag></span> },
            { n: 2, content: <span>{t('style.wf.2')} <Tag color="magenta">Lyrics</Tag> {t('style.wf.2b')}</span> },
            { n: 3, content: <span>{t('style.wf.3')}</span> },
            { n: 4, content: <span>{t('style.wf.4')}</span> },
          ].map(step => (
            <div key={step.n} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full
                               bg-gradient-to-br from-brand-blue to-brand-cyan
                               text-white text-xs font-bold
                               flex items-center justify-center shadow-lg shadow-brand-cyan/20">
                {step.n}
              </span>
              <p className="text-sm text-white/60 leading-relaxed">{step.content}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

const Tag = ({ children, color }) => (
  <span className={`font-semibold px-2 py-0.5 rounded-md text-xs mx-0.5 ${
    color === 'cyan'
      ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30'
      : 'bg-brand-magenta/20 text-brand-magenta border border-brand-magenta/30'
  }`}>
    {children}
  </span>
);

export default StyleTool;
