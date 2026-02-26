import { useState } from 'react';

const TagSelector = ({ category, categoryData, selected, onToggle }) => {
  const [search, setSearch] = useState('');

  const filtered = search
    ? categoryData.tags.filter(t =>
        t.label.toLowerCase().includes(search.toLowerCase()))
    : categoryData.tags;

  const isSelected = (tagLabel) => {
    if (!selected) return false;
    if (categoryData.multiple) {
      return Array.isArray(selected) && selected.includes(tagLabel);
    }
    return selected === tagLabel;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="font-semibold text-gray-700 text-sm flex items-center gap-2">
          <span>{categoryData.emoji}</span>
          <span>{categoryData.label}</span>
          <span className="font-normal text-gray-400 text-xs">
            — {categoryData.multiple ? 'Plusieurs choix' : '1 seul choix'}
          </span>
        </label>
        {categoryData.multiple && Array.isArray(selected) && selected.length > 0 && (
          <span className="text-xs text-teal-600 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
            {selected.length} sélectionné(s)
          </span>
        )}
      </div>

      {categoryData.tags.length > 10 && (
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-3 px-3 py-1.5 border border-gray-200 rounded-lg
                     text-sm text-gray-700 placeholder-gray-400
                     focus:outline-none focus:border-teal-400 transition-colors"
        />
      )}

      <div className="flex flex-wrap gap-2">
        {filtered.map(tag => (
          <button
            key={tag.id}
            onClick={() => onToggle(category, tag.label, categoryData.multiple)}
            className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
              isSelected(tag.label)
                ? 'bg-teal-500 border-teal-500 text-white font-medium shadow-sm'
                : tag.confidence === 'medium'
                  ? 'border-yellow-300 bg-yellow-50 text-yellow-700 hover:border-yellow-400'
                  : 'border-gray-300 text-gray-600 bg-white hover:border-teal-300 hover:text-teal-600'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
