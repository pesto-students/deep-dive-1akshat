const fs = require('fs');

const FILE_PATH = './files/file.csv';
const results = [];
let finalObj = [];
const DELIMETTERS = [',', ':', ' '];


// Main Function
const csvParse = (file) => {
    let readerStream = fs.createReadStream(FILE_PATH);

    readerStream.setEncoding('utf8');

    readerStream.on('data', (chunk) => {
        results.push(chunk)
    })

    readerStream.on('end', () => {
        parseCSVToJSON();
    })

    readerStream.on('error', () => {
        console.log(err.stack);
    })
}

csvParse(FILE_PATH);