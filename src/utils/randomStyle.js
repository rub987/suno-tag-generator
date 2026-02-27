const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)]?.label ?? null;

const pickN = (arr, n) =>
  [...arr].sort(() => Math.random() - 0.5).slice(0, n).map(t => t.label);

const maybe = (prob) => Math.random() < prob;

const high = (tags) => tags.filter(t => t.confidence === 'high');

export const generateRandomStyle = (tags) => {
  const cats = tags?.categories;
  if (!cats) return null;

  // Genre : toujours 1
  const genres = pickOne(high(cats.genres?.tags || []));

  // Moods : 1 à 3
  const moodCount = 1 + Math.floor(Math.random() * 3);
  const moods = pickN(high(cats.moods?.tags || []), moodCount);

  // Tempo : toujours 1
  const tempo = pickOne(cats.tempo?.tags || []);

  // Voix : 70% de chance (exclut "No Vocals" pour plus de dynamisme)
  const vocalPool = high(cats.vocals?.tags || []).filter(
    t => t.label !== 'No Vocals' && t.label !== 'Instrumental'
  );
  const vocals = maybe(0.7) ? pickOne(vocalPool) : null;

  // Instruments : 60% de chance, 1 à 2
  const instruments = maybe(0.6)
    ? pickN(high(cats.instruments?.tags || []), 1 + Math.floor(Math.random() * 2))
    : [];

  // Production : 50% de chance, 1 à 2
  const production = maybe(0.5)
    ? pickN(high(cats.production?.tags || []), 1 + Math.floor(Math.random() * 2))
    : [];

  // Effets : 30% de chance, 1 seul
  const effects = maybe(0.3)
    ? pickN(high(cats.effects?.tags || []), 1)
    : [];

  return { genres, moods, instruments, vocals, tempo, production, effects, soundfx: [] };
};
