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

  return animals.sort((animalA, animalB) => {
    if (animalA.numberOfLegs === animalB.numberOfLegs) {
      return animalA.name.localeCompare(animalB.name);
    }
    return animalA.numberOfLegs - animalB.numberOfLegs;
  });
};


export { animalSort };
