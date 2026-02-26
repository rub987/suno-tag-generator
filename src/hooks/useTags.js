import { useState, useEffect } from 'react';
import LOCAL_TAGS from '../data/tags.json';

const CACHE_KEY = 'suno_tags_cache';
const CACHE_TTL = 24 * 60 * 60 * 1000;

export const useTags = () => {
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('local');

  useEffect(() => { loadTags(); }, []);

  const getCachedTags = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const parsed = JSON.parse(cached);
      return Date.now() - parsed.timestamp > CACHE_TTL ? null : parsed;
    } catch { return null; }
  };

  const cacheTags = (data) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch {}
  };

  const loadTags = async () => {
    try {
      const cached = getCachedTags();
      if (cached) {
        setTags(cached.data);
        setSource('cache');
        setLoading(false);
        return;
      }
      setTags(LOCAL_TAGS);
      setSource('local');
      cacheTags(LOCAL_TAGS);
    } catch {
      setTags(LOCAL_TAGS);
      setSource('local');
    } finally {
      setLoading(false);
    }
  };

  const forceRefresh = () => {
    localStorage.removeItem(CACHE_KEY);
    setLoading(true);
    setTags(LOCAL_TAGS);
    setSource('local');
    setLoading(false);
  };

  return { tags, loading, source, forceRefresh };
};
