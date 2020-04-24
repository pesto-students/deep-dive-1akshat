function telephoneCheck(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    throw Error(`Expected String got ${typeof phoneNumber}`);
  }
  if (phoneNumber.length < 11) {
    return false;
  }

  const pattern = new RegExp(/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s-]?[\0-9]{3}[\s-]?[0-9]{4}$/, 'i');
  return pattern.test(phoneNumber);
}

export { telephoneCheck };
