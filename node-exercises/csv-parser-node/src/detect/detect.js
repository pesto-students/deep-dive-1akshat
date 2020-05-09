const { DELIMETERS } = require('../consts');

// Scan upto 20 rows to find the delimeter
let SCANUPTO = 20;


const sortObject = (objectToSort) => {
    let resultObject = {};
    let keys = Object.keys(objectToSort);
    const sortedKeys = keys.sort((a, b) => {
        return objectToSort[b] - objectToSort[a];
    })
    for (const key of sortedKeys) {
        resultObject[key] = objectToSort[key];
    }
    return resultObject;
}


const detect = (csvString) => {
    const data = csvString.split(/\r?\n/);
    if (data.length < SCANUPTO) {
        SCANUPTO = data.length;
    }
    let slicedData = data.slice(0, SCANUPTO);
    let charCounterObject = {};
    let count = 1;
    for (const item of slicedData) {
        for (const char of item) {
            // Check if the char is character/ number/ space then skip
            const regexPattern = /^[0-9a-zA-Z\s]+$/
            if (regexPattern.test(char)) { continue };
            if (char in charCounterObject) {
                charCounterObject[char] += 1;
            } else {
                charCounterObject[char] = count;
            }
        }
    }
    const sortedObject = sortObject(charCounterObject);
    const keys = Object.keys(sortedObject);
    for (const delim of keys)
        if (DELIMETERS.includes(delim)) {
            return delim;
        } else {
            continue;
        }
};

module.exports = detect;
