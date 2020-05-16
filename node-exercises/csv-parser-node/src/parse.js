const csvtojson = require('./scripts/csvtojson');
const jsontocsv = require('./scripts/jsontocsv');

const FILE_PATH = __dirname + '/data/file.csv';

const csvParse = (srcFilePath, destinationFilePath, errDestiantionPath) => {
    if (srcFilePath.includes('.csv')) {
        csvtojson(srcFilePath, destinationFilePath, { headers: true, transformHeader: (header) => header.map(column => column.toUpperCase()), isSkipErrors: true, shouldCaptureErrorData: false, errDestiantionPath: errDestiantionPath });
    } else {
        jsontocsv(srcFilePath, destinationFilePath)
    }
}

csvParse(FILE_PATH, __dirname + '/data/file.json', __dirname + '/data/error.json');
//csvParse("./files/file.json", "./files/newFile.csv");
