import TagSelector from '../Form/TagSelector';
import TagOutput from '../Output/TagOutput';

const StyleTool = ({ tags, selections, customTags, onToggle, onCustomTagsChange, onReset, output }) => {

  const totalSelected = [
    selections.genres ? 1 : 0,
    (selections.moods?.length || 0),
    (selections.instruments?.length || 0),
    selections.vocals ? 1 : 0,
    selections.tempo ? 1 : 0,
    (selections.production?.length || 0)
  ].reduce((a, b) => a + b, 0);

  const getButtonLabel = () => {
    if (totalSelected === 0) return '🎵 Sélectionne des tags pour commencer';
    if (totalSelected <= 2) return '🎶 Génère mon Style of Music';
    if (totalSelected <= 5) return '🚀 Générer mon Style of Music';
    return '🎸 Générer mon Style of Music';
  };

  const hasOutput = output.style.length > 0;

  return (
    <div>
      {/* Section title */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-3 h-3 rounded-full bg-teal-500 inline-block" />
        <h2 className="font-bold text-gray-700 tracking-wide uppercase text-sm">
          Outil 1 — Génère ton style musical
        </h2>
      </div>

      {/* Tag Categories */}
      <div className="space-y-4">
        {Object.entries(tags?.categories || {}).map(([key, categoryData]) => (
          <div key={key} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <TagSelector
              category={key}
              categoryData={categoryData}
              selected={selections[key]}
              onToggle={onToggle}
            />
          </div>
        ))}
      </div>

      {/* Custom Tags */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mt-4">
        <label className="block font-semibold text-teal-600 mb-1 text-sm flex items-center gap-2">
          <span>🖊️</span>
          <span>Tags personnalisés</span>
          <span className="font-normal text-gray-400">— Optionnel</span>
        </label>
        <input
          type="text"
          placeholder="Ex: ocean breeze, tropical, sunset vibes..."
          value={customTags}
          onChange={e => onCustomTagsChange(e.target.value)}
          className="w-full mt-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm
                     text-gray-700 placeholder-gray-400 focus:outline-none
                     focus:border-teal-400 transition-colors"
        />
        <p className="text-xs text-gray-400 mt-1.5 italic">Sépare par des virgules</p>
      </div>

      {/* Generate Button */}
      <button
        disabled={totalSelected === 0 && !customTags}
        className={`w-full mt-6 py-4 rounded-xl font-bold text-white text-lg
                    transition-all duration-300 shadow-md
                    ${totalSelected === 0 && !customTags
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500 shadow-none'
                      : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]'
                    }`}
      >
        {getButtonLabel()}
        {totalSelected > 0 && (
          <span className="ml-2 text-sm font-normal opacity-80">
            ({totalSelected} tag{totalSelected > 1 ? 's' : ''})
          </span>
        )}
      </button>

      {/* Reset */}
      {totalSelected > 0 && (
        <div className="mt-2 flex justify-end">
          <button
            onClick={onReset}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            🗑️ Tout effacer
          </button>
        </div>
      )}

      {/* Output */}
      <TagOutput output={output} />

      {/* Workflow Section */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span>📖</span>
          <span>Workflow complet dans Suno AI</span>
        </h3>
        <div className="space-y-3">
          <WorkflowStep
            number={1}
            text={
              <>
                Utilise l'<strong>Outil 1</strong> → copie dans{' '}
                <span className="text-teal-600 font-semibold bg-teal-50 px-1.5 py-0.5 rounded">
                  Style of Music
                </span>
              </>
            }
          />
          <WorkflowStep
            number={2}
            text={
              <>
                Utilise l'<strong>Outil 2</strong> → copie dans{' '}
                <span className="text-purple-600 font-semibold bg-purple-50 px-1.5 py-0.5 rounded">
                  Lyrics
                </span>
                {' '}puis écris tes paroles dans les espaces
              </>
            }
          />
          <WorkflowStep
            number={3}
            text={
              <>
                Sur <strong>suno.com</strong>, active le{' '}
                <strong>Custom mode</strong>
              </>
            }
          />
          <WorkflowStep
            number={4}
            text={
              <>
                Colle chaque résultat dans le bon champ et clique{' '}
                <strong>Create</strong> 🎵
              </>
            }
          />
        </div>
      </div>

    </div>
  );
};

const WorkflowStep = ({ number, text }) => (
  <div className="flex items-start gap-3">
    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 text-white
                     text-xs font-bold flex items-center justify-center mt-0.5">
      {number}
    </span>
    <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
  </div>
);

export default StyleTool;
