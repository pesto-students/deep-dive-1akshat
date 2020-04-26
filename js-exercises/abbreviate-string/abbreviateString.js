function abbreviateString(word) {
  const trimWord = word.trim();

  if (typeof trimWord !== 'string') {
    throw Error(`Expected string, got ${typeof trimWord}`);
  }

  if (trimWord.length < 1) {
    throw Error('Got empty string.');
  }

  if (trimWord.split(' ').length === 1) {
    return trimWord[0].toUpperCase() + trimWord.substring(1);
  }

  const stringArray = trimWord.split(' ');
  const firstWord = stringArray[0];
  const lastWord = stringArray[stringArray.length - 1];
  return `${firstWord} ${lastWord[0].toUpperCase()}.`;
}

export { abbreviateString };
