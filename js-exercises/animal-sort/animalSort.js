const isObject = (argument) => argument !== null && typeof argument === 'object';

const animalSort = animals => {
  if (!(animals instanceof Array)) {
    throw Error(`Expected Array as an input, got ${typeof animals}`);
  }

  const requiredKeys = ['numberOfLegs', 'name'];

  const requiredKeysPresent = animals.every(animal => isObject(animal)
    && requiredKeys.every(key => animal[key] !== undefined));

  if (!requiredKeysPresent) {
    throw Error('Expected keys : "numberOfLegs" and "name" not found.');
  }

  return animals.sort((animalA, animalB) => {
    if (animalA.numberOfLegs === animalB.numberOfLegs) {
      return animalA.name.localeCompare(animalB.name);
    }
    return animalA.numberOfLegs - animalB.numberOfLegs;
  });
};


export { animalSort };
