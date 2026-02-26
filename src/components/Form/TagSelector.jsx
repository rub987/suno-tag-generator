import { useState } from 'react';

const TagSelector = ({ category, categoryData, selected, onToggle }) => {
  const [search, setSearch] = useState('');

  const filtered = search
    ? categoryData.tags.filter(t =>
        t.label.toLowerCase().includes(search.toLowerCase()))
    : categoryData.tags;

  const isSelected = (tagLabel) => {
    if (categoryData.multiple) return selected?.includes(tagLabel);
    return selected === tagLabel;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <label className="font-semibold text-gray-200">
          {categoryData.emoji} {categoryData.label}
        </label>
        {categoryData.multiple && selected?.length > 0 && (
          <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded-full">
            {selected.length} sélectionné(s)
          </span>
        )}
      </div>

      {categoryData.tags.length > 10 && (
        <input
          type="text"
          placeholder={`Rechercher...`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-3 px-3 py-2 bg-gray-800 border border-gray-700
                     rounded-lg text-sm text-white placeholder-gray-500
                     focus:outline-none focus:border-purple-500 transition-colors"
        />
      )}

      <div className="flex flex-wrap gap-2">
        {filtered.map(tag => (
          <button
            key={tag.id}
            onClick={() => onToggle(category, tag.label, categoryData.multiple)}
            title={tag.confidence === 'medium' ? '⚠️ Tag non confirmé officiellement' : ''}
            className={`tag-chip ${
              isSelected(tag.label)
                ? 'tag-chip-selected'
                : tag.confidence === 'medium'
                  ? 'tag-chip-medium'
                  : 'tag-chip-default'
            }`}
          >
            {tag.label}
            {tag.confidence === 'medium' && (
              <span className="ml-1 text-yellow-400 text-xs">⚠</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-sm italic">Aucun tag trouvé</p>
      )}
    </div>
  );
};

export default TagSelector;
