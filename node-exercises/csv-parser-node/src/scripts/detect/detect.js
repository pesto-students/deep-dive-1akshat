const { DELIMETERS } = require('../../consts');

// Scan upto 30 rows to find the delimeter
let SCANUPTO = 30;

// const isValifCSVFormat = (csvString) => {
//     const regexP = new RegExp(/^[A-Za-z0-9]+(?:[,:|^*#@!\t\r\n] ?[A-Za-z0-9]+)*$/gm);
//     return regexP.test(csvString);
// }

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
    // if (!isValifCSVFormat(csvString)) {
    //     throw new Error("The input string in not a valid csv format.")
    // }
    const data = csvString.split(/\r?\n\t/);
    if (data.length < SCANUPTO) {
        SCANUPTO = data.length;
    }
    let slicedData = data.slice(0, SCANUPTO);
    let charCounterObject = {};
    let count = 1;
    for (const item of slicedData) {
        for (const char of item) {
            // Check if the char is character/ number/ space then skip
            const regexPattern = new RegExp(/^[0-9a-zA-Z]+$/);
            if (regexPattern.test(char) || char === " ") { continue };
            if (char in charCounterObject) {
                charCounterObject[char] += 1;
            } else {
                charCounterObject[char] = count;
            }
        }
    }
    const sortedObject = sortObject(charCounterObject);
    const keys = Object.keys(sortedObject);
    if (keys.length === 0) {
        throw Error('No valid delimeter found.');
    }
    for (const delim of keys)
        if (DELIMETERS.includes(delim)) {
            return delim;
        } else {
            throw Error("Could Not find a valid delimeter.")
        }
};


module.exports = detect;
