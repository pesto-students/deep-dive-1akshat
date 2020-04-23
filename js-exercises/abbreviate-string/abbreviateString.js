function abbreviateString(str) {
  if (typeof (str) !== 'string') { throw Error(`Expected string, got ${typeof str}`); }

  const stringArray = str.split(' ');
  const startString = stringArray[0];
  const endString = stringArray[stringArray.length - 1];
  return `${startString} ${endString[0].toUpperCase()}.`;
}

export { abbreviateString };
