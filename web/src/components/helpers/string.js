export function template(content, replacements) {
  if (!content) {return ''}
  return content.replace(/{{(.+)}}/g, (match, key) => {
    const value = replacements[key];
    if (typeof value !== 'undefined') {
      return value;
    }
    return match; // guards against some unintentional prefix
  });
}
