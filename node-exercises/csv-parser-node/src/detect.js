const { DELIMETERS } = require('./consts');

// Scan upto 20 rows to find the delimeter
let SCANUPTO = 20;

const sortObject = (objectToSort) => {
    let resultObject = {};
    let keys = Object.keys(objectToSort);
    keys.sort((a, b) => {
        return objectToSort[a] - objectToSort[b];
    }).reverse().forEach((key) => {
        resultObject[key] = objectToSort[key];
    });
    return resultObject;
}

// TODO: Trim the spaces in the csv string
// Ex: [1, 2, 3, 4, 5]
const Detect = (csvString) => {
    const data = csvString.split(/\r?\n/);
    if (data < SCANUPTO) {
        SCANUPTO = data.length;
    }
    let slicedData = data.slice(0, SCANUPTO);
    let charCounterObject = {};
    let count = 1;
    for (const item of slicedData) {
        for (const char of item) {
            // Check if the char is character/number then skip
            const re = /^[0-9a-zA-Z]+$/
            if (re.test(char)) { continue };
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
            console.log(delim);
            return delim;
        } else {
            continue;
        }
};



module.exports = { Detect };