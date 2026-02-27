import { useState, useCallback } from 'react';

const STORAGE_KEY = 'suno_tag_history';
const MAX_ENTRIES = 15;

const loadHistory = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const useHistory = () => {
  const [history, setHistory] = useState(loadHistory);

  const addEntry = useCallback((style, tagCount, charCount) => {
    if (!style) return;
    setHistory(prev => {
      if (prev[0]?.style === style) return prev; // pas de doublon consécutif
      const entry = { id: Date.now(), style, tagCount, charCount, timestamp: Date.now() };
      const updated = [entry, ...prev].slice(0, MAX_ENTRIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeEntry = useCallback((id) => {
    setHistory(prev => {
      const updated = prev.filter(e => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, addEntry, removeEntry, clearHistory };
};
