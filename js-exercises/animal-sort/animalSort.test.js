import { animalSort } from './animalSort';

describe('animalSort', () => {
  it('should return empty array if empty array is passed in', () => {
    expect(() => animalSort([{}])).toThrowError(/[A-Za-z0-9]+/g);
    expect(() => animalSort([{ name: '', legs: '' }])).toThrowError(/[A-Za-z0-9]+/g);
    expect(() => animalSort({})).toThrowError(/[A-Za-z0-9]+/g);
    expect(() => animalSort(null)).toThrowError(/[A-Za-z0-9]+/g);
  });

  it('should return empty array if empty array is passed in', () => {
    expect(animalSort([])).toEqual([]);
  });

  it('should return a sorted array of animal objects by their number of legs', () => {
    const arr = [
      { name: 'Dog', numberOfLegs: 4 },
      { name: 'Bird', numberOfLegs: 2 },
      { name: 'Snake', numberOfLegs: 0 },
    ];
    const result = [
      { name: 'Snake', numberOfLegs: 0 },
      { name: 'Bird', numberOfLegs: 2 },
      { name: 'Dog', numberOfLegs: 4 },
    ];
    expect(animalSort(arr)).toEqual(result);
  });

  it('should also return sorted names of animals with same number of legs', () => {
    const arr = [
      { name: 'Cat', numberOfLegs: 4 },
      { name: 'Snake', numberOfLegs: 0 },
      { name: 'Dog', numberOfLegs: 4 },
      { name: 'Pig', numberOfLegs: 4 },
      { name: 'Human', numberOfLegs: 2 },
      { name: 'Bird', numberOfLegs: 2 },
    ];
    const result = [
      { name: 'Snake', numberOfLegs: 0 },
      { name: 'Bird', numberOfLegs: 2 },
      { name: 'Human', numberOfLegs: 2 },
      { name: 'Cat', numberOfLegs: 4 },
      { name: 'Dog', numberOfLegs: 4 },
      { name: 'Pig', numberOfLegs: 4 },
    ];
    expect(animalSort(arr)).toEqual(result);
  });

  it('should also return sorted names of animals with number of legs as null', () => {
    const arr = [
      { name: 'Cat', numberOfLegs: null },
      { name: 'Snake', numberOfLegs: null },
      { name: 'Dog', numberOfLegs: null },
      { name: 'Pig', numberOfLegs: null },
      { name: 'Human', numberOfLegs: null },
      { name: 'Bird', numberOfLegs: null },
    ];
    const result = [
      { name: 'Bird', numberOfLegs: null },
      { name: 'Cat', numberOfLegs: null },
      { name: 'Dog', numberOfLegs: null },
      { name: 'Human', numberOfLegs: null },
      { name: 'Pig', numberOfLegs: null },
      { name: 'Snake', numberOfLegs: null },
    ];
    expect(animalSort(arr)).toEqual(result);
  });
});
