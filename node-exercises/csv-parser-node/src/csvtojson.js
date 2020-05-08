const fs = require("fs");
const { Transform } = require("stream");
const DELIMETERS = require("./consts");
const initialConfig = { headers: true, transformHeader: () => {} };
let header = [];

const csvtojson = (
  srcFilePath,
  destinationFilePath,
  config = initialConfig
) => {
  const src = fs.createReadStream(srcFilePath, "utf8");
  const destination = fs.createWriteStream(destinationFilePath);
  const JSONArr = [];

  //TODO use delimeters array to split the chunk
  const transformToJSON = new Transform({
    readableObjectMode: true,
    transform: function (chunk, _, cb) {
      const data = chunk.toString().split(/\r?\n/);
      if (config.headers) {
        const splittedHeader = data.splice(0, 1)[0].split(",");
        if (header.length === 0) {
          header = splittedHeader;
          if (
            typeof config.transformHeader === "function" &&
            config.transformHeader.length === 1
          ) {
            header = config.transformHeader(splittedHeader);
          }
        }
        for (let item of data) {
          const JSONobject = {};
          const splittedItem = item.split(/,(?! )/);
          for (let [id, key] of header.entries()) {
            JSONobject[key] = splittedItem[id];
          }
          this.push(JSONobject, 'utf8');
        }
      } else {
        for (let item of data) {
          const splittedItem = item.split(/,(?! )/);
          this.push(splittedItem, 'utf8');
        }
      }
      cb();
    },
  });

  src
    .pipe(transformToJSON)
    .on("data", (chunk) => {
      JSONArr.push(chunk);
    })
    .on("end", () => {
      destination.write(JSON.stringify(JSONArr));
    })
};

module.exports = csvtojson;
