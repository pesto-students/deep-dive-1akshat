const fs = require("fs");
const { Transform } = require("stream");

const jsontocsv = (srcFilePath, destinationFilePath) => {
  const src = fs.createReadStream(srcFilePath, "utf8");
  const destination = fs.createWriteStream(destinationFilePath);

  //TODO use delimeters array to split the chunk
  const transformToCSV = new Transform({
    transform: function (chunk, _, cb) {
      const CSVdata = chunk
        .toString()
        .replace(/("\w{1,}":)|[\r\n\s{[\]]/g, '')
        .replace(/},|}/g, "\n");
      cb(null, CSVdata);
    },
  });

  src.pipe(transformToCSV).pipe(destination);
};

module.exports = jsontocsv;
