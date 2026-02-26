export const generateFullOutput = (selections, customTags) => {
  const { genres, moods, instruments, vocals, tempo, production } = selections;

  const parts = [];

  if (genres) parts.push(genres);
  if (Array.isArray(moods) && moods.length) parts.push(...moods);
  if (tempo) parts.push(tempo);
  if (vocals) parts.push(vocals);
  if (Array.isArray(instruments) && instruments.length) parts.push(...instruments);
  if (Array.isArray(production) && production.length) parts.push(...production);

  const customClean = customTags
    ?.split(',')
    .map(t => t.trim())
    .filter(Boolean) || [];

  const allTags = [...parts, ...customClean];
  const style = allTags.join(', ');

  return {
    style,
    charCount: style.length,
    tagCount: allTags.length,
    isValid: style.length <= 200,
    warning: style.length > 180
      ? 'Attention : proche de la limite de 200 caractères Suno'
      : null
  };
};
