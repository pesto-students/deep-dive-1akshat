import { isString } from 'util';

function abbreviateString(str) {
  if (!isString(str)) throw Error(`Expected string, got ${typeof str}`);

  const stringArray = str.split(' ');
  return `${stringArray[0]} ${stringArray[stringArray.length - 1][0].toUpperCase()}.`;
}

export { abbreviateString };
