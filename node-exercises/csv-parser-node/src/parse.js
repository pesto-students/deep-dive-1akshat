const fs = require('fs');
const csvtojson = require('./csvtojson');
const jsontocsv = require('./jsontocsv');

const FILE_PATH = './files/file.csv';
const results = [];
let finalObj = [];
const DELIMETERS = require('./consts');


// Main Function
const csvParse = (srcFilePath, destinationFilePath) => {
    // let readerStream = fs.createReadStream(FILE_PATH, 'utf8');

    // readerStream.setEncoding('utf8');

    // readerStream.on('readable', () => {
    //     console.log()
    // })

    // readerStream.on('data', (chunk) => {
    //     results.push(chunk)
    // })

    // readerStream.on('end', () => {
    //     parseCSVToJSON();
    // })

    // readerStream.on('error', () => {
    //     console.log(err.stack);
    // })
    
    if(srcFilePath.includes('.csv')) {
        csvtojson(srcFilePath, destinationFilePath);
    } else {
        jsontocsv(srcFilePath, destinationFilePath)
    }
}

csvParse(FILE_PATH, "./files/file.json");
//csvParse("./files/file.json", "./files/newFile.csv");
