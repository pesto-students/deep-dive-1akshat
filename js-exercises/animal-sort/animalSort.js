const animalSort = animals => {
  if (!(animals instanceof Array)) {
    throw Error(`Expected Array as an input, got ${typeof animals}`);
  }


  return animals.sort((animalA, animalB) => {
   if (animalA.numberOfLegs === animalB.numberOfLegs) {
      return animalA.name.localeCompare(animalB.name);
    }
   return animalA.numberOfLegs > animalB.numberOfLegs;
  });
};

export { animalSort };
