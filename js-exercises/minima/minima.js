const sort = array => array.sort((a, b) => a - b);

const minima = (numberOfElements, inputArray) => {
  if (!Array.isArray(inputArray)) {
    throw Error(`Expected Array Got ${typeof inputArray}`);
  }

  if (inputArray.length === 0) {
    throw Error('Got empty array as an input');
  }

  if (inputArray.length < numberOfElements) {
    throw Error('Number of Elements to be returned is more then the array length.');
  }

  if (typeof numberOfElements !== 'number') {
    throw Error(`Expected numberOfElements argument as number. Got ${typeof numberOfElements}`);
  }

  const sortedArray = sort(inputArray);
  const slicedArray = sortedArray.slice(0, numberOfElements);
  return slicedArray;
};


// console.log(minima('', [5, 3, 4]));

export { minima };
