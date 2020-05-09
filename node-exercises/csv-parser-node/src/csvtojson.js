const fs = require("fs");
const { Transform } = require("stream");
const Detect = require("./detect");
const initialConfig = { headers: true, transformHeader: () => { }, isSkipErrors: true };

const csvtojson = (
  srcFilePath,
  destinationFilePath,
  config = initialConfig
) => {
  const src = fs.createReadStream(srcFilePath, "utf8");
  const destination = fs.createWriteStream(destinationFilePath);
  const JSONArr = [];
  let header = [];
  let validRowLength = 0;
  const modifiedConfig = { ...initialConfig, ...config };

  //TODO use delimeters array to split the chunk
  const transformToJSON = new Transform({
    readableObjectMode: true,
    transform: function (chunk, _, cb) {
      const delimeter = Detect(chunk.toString());
      const data = chunk.toString().split(/\r?\n/);
      if (modifiedConfig.headers) {
        if (header.length === 0) {
          const splittedHeader = data.splice(0, 1)[0].split(delimeter);
          header = splittedHeader;
          if (
            typeof modifiedConfig.transformHeader === "function" &&
            modifiedConfig.transformHeader.length === 1
          ) {
            header = modifiedConfig.transformHeader(splittedHeader);
          }
          validRowLength = checkChunkLength(data);
        }
        for (let item of data) {
          const JSONobject = {};
          const splittedItem = item.split(/,(?! )/);
          if (splittedItem.length === validRowLength) {
            for (let [id, key] of header.entries()) {
              JSONobject[key] = splittedItem[id];
            }
            this.push(JSONobject, "utf8");
          } else if (!modifiedConfig.isSkipErrors) {
            throw new Error(`${splittedItem} missed few fields`)
          }
        }
      } else {
        for (let item of data) {
          const splittedItem = item.split(/,(?! )/);
          this.push(splittedItem, "utf8");
        }
      }
      cb();
    },
  });

  const checkChunkLength = (data) => {
    const object = {};
    let key = "";
    const dataLength = data.length > 20 ? 20 : data.length;
    for (let i = 0; i < dataLength; i++) {
      const splittedItem = data[i].split(/,(?! )/);
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

  src
    .pipe(transformToJSON)
    .on("data", (chunk) => {
      JSONArr.push(chunk);
    }).on('error', (err) => {
      console.log(err);
    })
    .on("end", () => {
      destination.write(JSON.stringify(JSONArr));
    });
};

module.exports = csvtojson;
