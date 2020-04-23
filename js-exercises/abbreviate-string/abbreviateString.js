function abbreviateString(str) {
  if (typeof (str) !== 'string') {
    throw Error(`Expected string, got ${typeof str}`);
  }

  if (str.length < 1) {
    throw Error('Got empty string.');
  }

  if (str.split(' ').length === 1) {
    return str[0].toUpperCase() + str.substring(1);
  }

  const stringArray = str.split(' ');
  const firstWord = stringArray[0];
  const lastWord = stringArray[stringArray.length - 1];
  return `${firstWord} ${lastWord[0].toUpperCase()}.`;
}


export { abbreviateString };
