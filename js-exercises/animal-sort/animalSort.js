const animalSort = animals => {
  if (!(animals instanceof Array)) {
    throw Error(`Expected Array as an input, got ${typeof animals}`);
  }

  const requiredKeys = ['numberOfLegs', 'name'];

  for (const animal of animals) {
    if (!(requiredKeys.every(key => Object.keys(animal).includes(key)))) {
      throw Error('Expected keys : "numberOfLegs" and "name" not found.');
    }
  }

  if (animals.length < 1) {
    return [];
  }

  return animals.sort((animalA, animalB) => {
    if (animalA.numberOfLegs === animalB.numberOfLegs) {
      return animalA.name.localeCompare(animalB.name);
    }
    if (animalA.numberOfLegs > animalB.numberOfLegs) {
      return 1;
    }
    if (animalA.numberOfLegs < animalB.numberOfLegs) {
      return -1;
    }
    return 1;
  });
};

export { animalSort };
