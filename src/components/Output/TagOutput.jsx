import { useState, useEffect, useRef } from 'react';
import { useLang } from '../../contexts/LangContext';

const TagOutput = ({ output, onSave }) => {
  const [copied, setCopied] = useState(false);
  const [orderedTags, setOrderedTags] = useState([]);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragIndex = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    if (output.style) {
      setOrderedTags(output.style.split(', ').filter(Boolean));
    } else {
      setOrderedTags([]);
    }
  }, [output.style]);

  const orderedStyle = orderedTags.join(', ');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(orderedStyle);
    setCopied(true);
    onSave?.(orderedStyle, output.tagCount, output.charCount);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDragStart = (index) => {
    dragIndex.current = index;
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragIndex.current !== index) setDragOverIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (dragIndex.current === null || dragIndex.current === dropIndex) {
      setDragOverIndex(null);
      return;
    }
    const newTags = [...orderedTags];
    const [moved] = newTags.splice(dragIndex.current, 1);
    newTags.splice(dropIndex, 0, moved);
    setOrderedTags(newTags);
    dragIndex.current = null;
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    dragIndex.current = null;
    setDragOverIndex(null);
  };

  if (!output.style) return (
    <div className="mt-6 rounded-2xl border-2 border-dashed border-white/10 p-10 text-center">
      <p className="text-4xl mb-3">🎵</p>
      <p className="text-white/30 text-sm">{t('output.empty')}</p>
    </div>
  );

  return (
    <div className="mt-6 rounded-2xl border border-brand-cyan/30 overflow-hidden
                    shadow-xl shadow-brand-cyan/10">

      {/* Header */}
      <div className="bg-brand-cyan/10 px-5 py-3 border-b border-brand-cyan/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-brand-cyan text-sm">🎯 Style of Music</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${
              !output.isValid
                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                : output.charCount > 900
                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                : 'bg-green-500/10 text-green-400 border-green-500/20'
            }`}>
              {output.charCount}/{output.limit}
            </span>
            <span className="text-xs text-white/30">{output.tagCount} {t('output.tags')}</span>
          </div>
          <button
            onClick={handleCopy}
            className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${
              copied
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan border border-brand-cyan/30'
            }`}
          >
            {copied ? t('output.copied') : t('output.copy')}
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              !output.isValid
                ? 'bg-red-500'
                : output.charCount > 900
                ? 'bg-yellow-400'
                : 'bg-brand-cyan'
            }`}
            style={{ width: `${Math.min((output.charCount / output.limit) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Draggable tags */}
      <div className="bg-black/30 p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {orderedTags.map((tag, index) => (
            <div
              key={`${tag}-${index}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-mono
                          cursor-grab active:cursor-grabbing select-none transition-all duration-150
                          ${dragOverIndex === index
                            ? 'scale-105 ring-1 ring-white/40 brightness-125'
                            : 'hover:brightness-110'
                          }
                          ${index === 0
                            ? 'bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan'
                            : 'bg-white/8 border border-white/10 text-white/70'
                          }`}
            >
              <span className="text-white/20 text-xs">⠿</span>
              {index === 0 && (
                <span className="text-[10px] text-brand-cyan font-bold">★</span>
              )}
              {tag}
            </div>
          ))}
        </div>
        <p className="font-mono text-white/20 text-xs leading-relaxed break-all">
          {orderedStyle}
        </p>
      </div>

      {/* Drag hint */}
      <div className="bg-brand-cyan/5 border-t border-brand-cyan/10 px-5 py-2">
        <p className="text-xs text-white/30">
          {t('output.drag')}{' '}
          <span className="text-brand-cyan/50">{t('output.priority')}</span>
        </p>
      </div>

      {/* Warning */}
      {output.warning && (
        <div className="bg-yellow-500/10 border-t border-yellow-500/20 px-5 py-2">
          <p className="text-yellow-400 text-xs">⚠️ {output.warning}</p>
        </div>
      )}

      {/* Hint */}
      <div className="bg-white/5 border-t border-white/10 px-5 py-3">
        <p className="text-xs text-white/30">
          {t('output.hint')}{' '}
          <strong className="text-brand-cyan/70">"Style of Music"</strong>
          {' '}{t('output.hint.post')}
        </p>
      </div>
    </div>
  );
};

export default TagOutput;
