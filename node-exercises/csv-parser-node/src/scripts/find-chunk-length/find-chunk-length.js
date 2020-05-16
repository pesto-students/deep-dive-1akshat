const checkChunkLength = (data, delimeter, validRowLength) => {
  const object = {};
  let key = "";
  const pattern = new RegExp(`${delimeter}(?! )`);
  const dataLength = data.length > 20 ? 20 : data.length;
  for (let i = 0; i < dataLength; i++) {
    const splittedItem = data[i].split(pattern);
    if (object[splittedItem.length]) {
      object[splittedItem.length]++;
    } else {
      object[splittedItem.length] = 1;
    }
  }
  for (let [index, item] of Object.entries(object)) {
    if (validRowLength < item) {
      validRowLength = item;
      key = index;
    }
  }
  return parseInt(key);
};

module.exports = checkChunkLength;