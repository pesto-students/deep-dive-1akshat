const csvtojson = require('./csvtojson');
const jsontocsv = require('./jsontocsv');

const FILE_PATH = __dirname+'/files/file.csv';

const csvParse = (srcFilePath, destinationFilePath, errDestiantionPath) => {
    if(srcFilePath.includes('.csv')) {
        csvtojson(srcFilePath, destinationFilePath, {headers: true, transformHeader: (header) => header.map( column => column.toUpperCase() ), isSkipErrors: true, shouldCaptureErrorData: false, errDestiantionPath: errDestiantionPath});
    } else {
        jsontocsv(srcFilePath, destinationFilePath)
    }
}

csvParse(FILE_PATH, __dirname+"/files/file.json", __dirname+"/files/error.json");
//csvParse("./files/file.json", "./files/newFile.csv");
