import { useState } from 'react';
import { useLang } from '../../contexts/LangContext';

const TagSelector = ({ category, categoryData, selected, onToggle }) => {
  const [search, setSearch] = useState('');
  const { t } = useLang();

  const filtered = search
    ? categoryData.tags.filter(tag =>
        tag.label.toLowerCase().includes(search.toLowerCase()))
    : categoryData.tags;

  const isSelected = (tagLabel) => {
    if (!selected) return false;
    if (categoryData.multiple) return Array.isArray(selected) && selected.includes(tagLabel);
    return selected === tagLabel;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="font-semibold text-sm flex items-center gap-2">
          <span>{categoryData.emoji}</span>
          <span className="text-brand-cyan">{t('cat.' + category)}</span>
          <span className="font-normal text-white/30 text-xs">
            {categoryData.multiple ? t('selector.multiple') : t('selector.single')}
          </span>
        </label>
        {categoryData.multiple && Array.isArray(selected) && selected.length > 0 && (
          <span className="text-xs text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20
                           px-2 py-0.5 rounded-full">
            {t('selector.count', { n: selected.length })}
          </span>
        )}
      </div>

      {categoryData.tags.length > 10 && (
        <input
          type="text"
          placeholder={t('selector.search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-xl
                     text-sm text-white placeholder-white/30
                     focus:outline-none focus:border-brand-cyan/50 transition-colors"
        />
      )}

      <div className="flex flex-wrap gap-2">
        {filtered.map(tag => (
          <button
            key={tag.id}
            onClick={() => onToggle(category, tag.label, categoryData.multiple)}
            className={`tag-chip ${
              isSelected(tag.label)
                ? 'tag-chip-selected'
                : tag.confidence === 'medium'
                  ? 'tag-chip-medium'
                  : 'tag-chip-default'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-white/30 text-sm italic">{t('selector.none')}</p>
      )}
    </div>
  );
};

export default TagSelector;
