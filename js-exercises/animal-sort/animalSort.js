const animalSort = animals => {
  if (!(animals instanceof Array)) {
    throw Error(`Expected Array as an input, got ${typeof animals}`);
  }

  if (animals.length < 1) {
    throw Error('Argument passed is empty.');
  }

  const requiredKeys = ['numberOfLegs', 'name'];

  for (const animal of animals) {
    if (!(requiredKeys.every(key => Object.keys(animal).includes(key)))) {
      throw Error('Expected keys : "numberOfLegs" and "name" not found.');
    }
  }

  return animals.sort((animalA, animalB) => {
    if (animalA.numberOfLegs > animalB.numberOfLegs) {
      return 1;
    }
    if (animalA.numberOfLegs === animalB.numberOfLegs) {
      return animalA.name.localeCompare(animalB.name);
    }
    if (animalA.numberOfLegs < animalB.numberOfLegs) {
      return -1;
    }
    return 1;
  });
};

const result = [];
console.log(animalSort(result));

// export { animalSort };
