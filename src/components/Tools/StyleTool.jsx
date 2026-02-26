// src/components/Tools/StyleTool.jsx
import TagSelector from '../Form/TagSelector';
import TagOutput from '../Output/TagOutput';

const StyleTool = ({ tags, selections, customTags, onToggle, onCustomTagsChange, onReset, output }) => (
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
      <label className="block font-semibold text-gray-700 mb-2 text-sm">
        ✏️ Tags personnalisés
      </label>
      <input
        type="text"
        placeholder="ex: cinematic, epic, 80s style..."
        value={customTags}
        onChange={e => onCustomTagsChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm
                   text-gray-700 placeholder-gray-400 focus:outline-none
                   focus:border-teal-400 transition-colors"
      />
    </div>

    {/* Reset */}
    <div className="mt-4 flex justify-end">
      <button
        onClick={onReset}
        className="px-5 py-2 border border-gray-300 rounded-lg text-sm
                   text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-all"
      >
        🗑️ Reset
      </button>
    </div>

    {/* Output */}
    <TagOutput output={output} />
  </div>
);

export default StyleTool;
