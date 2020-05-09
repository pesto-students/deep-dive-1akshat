const fs = require("fs");
const { Transform } = require("stream");
const detect = require("./detect/detect");
const checkChunkLength = require('./find-chunk-length/find-chunk-length');

const initialConfig = {
  headers: true,
  transformHeader: () => { },
  isSkipErrors: true,
  shouldCaptureErrorData: true,
  errDestiantionPath: "",
};

const csvtojson = (
  srcFilePath,
  destinationFilePath,
  config = initialConfig
) => {
  const modifiedConfig = { ...initialConfig, ...config };

  if (typeof modifiedConfig.headers !== "boolean") {
    throw new TypeError(
      `Expected boolean, got ${typeof modifiedConfig.headers}`
    );
  } else if (typeof modifiedConfig.transformHeader !== "function") {
    throw new TypeError(
      `Expected a function, got ${typeof modifiedConfig.transformHeader}`
    );
  } else if (typeof modifiedConfig.isSkipErrors !== "boolean") {
    throw new TypeError(
      `Expected boolean, got ${typeof modifiedConfig.isSkipErrors}`
    );
  }

  const src = fs.createReadStream(srcFilePath, { encoding: "utf8" });
  let destination = "";
  let errorDestination = "";
  const JSONArr = [];
  const errJSONArr = [];
  let header = [];
  let validRowLength = 0;

  //TODO use delimeters array to split the chunk
  const transformToJSON = new Transform({
    objectMode: true,
    transform: function (chunk, _, cb) {
      let rows = chunk.toString();
      this.delimeter = detect(rows);
      if (this.lastRowData) rows = this.lastRowData + rows;

      const data = rows.split(/\r?\n/);
      this.lastRowData = data.splice(data.length - 1, 1)[0];
      const regexPattern = new RegExp(`${this.delimeter}(?! )`);

      if (modifiedConfig.headers) {
        if (header.length === 0) {
          const splittedHeader = data.splice(0, 1)[0].split(this.delimeter);
          header = splittedHeader;
          if (modifiedConfig.transformHeader.length === 1) {
            header = modifiedConfig.transformHeader(splittedHeader);
          }
          validRowLength = checkChunkLength(data, this.delimeter, validRowLength);
        }
        for (let item of data) {
          const JSONobject = {};
          const splittedItem = item.split(regexPattern);
          if (splittedItem.length === validRowLength) {
            for (let [id, key] of header.entries()) {
              JSONobject[key] = splittedItem[id];
            }
            this.push({ data: JSONobject, isCaputre: false }, "utf8");
          } else if (!modifiedConfig.isSkipErrors) {
            this.emit(
              "error",
              new TypeError(
                `${splittedItem} missed ${
                validRowLength - splittedItem.length
                } fields`
              )
            );
          } else if (modifiedConfig.shouldCaptureErrorData) {
            this.push({ data: splittedItem, isCaputre: true });
          }
        }
      } else {
        for (let item of data) {
          const splittedItem = item.split(regexPattern);
          this.push(splittedItem, "utf8");
        }
      }
      cb();
    },
    flush: function (cb) {
      const regexPattern = new RegExp(`${this.delimeter}(?! )`);
      if (this.lastRowData) {
        if (modifiedConfig.headers) {
          const JSONobject = {};
          const splittedItem = this.lastRowData.split(regexPattern);
          if (splittedItem.length === validRowLength) {
            for (let [id, key] of header.entries()) {
              JSONobject[key] = splittedItem[id];
            }
            this.push(JSONobject, "utf8");
          } else if (!modifiedConfig.isSkipErrors) {
            this.emit(
              "error",
              new TypeError(
                `${splittedItem} missed ${
                validRowLength - splittedItem.length
                } fields`
              )
            );
          }
        } else {
          const splittedItem = this.lastRowData.split(regexPattern);
          this.push(splittedItem, "utf8");
        }
      }
      this.lastRowData = null;
      this.delimeter = null;
      cb();
    },
  });

  src.on("error", (err) => console.log(err));
  transformToJSON.on("error", (err) => console.log(err));

  src
    .pipe(transformToJSON)
    .on("data", (chunk) => {
      if (chunk.isCaputre) {
        errJSONArr.push(chunk.data);
      } else {
        JSONArr.push(chunk.data);
      }
    })
    .on("end", () => {
      destination = fs.createWriteStream(destinationFilePath);
      destination.write(JSON.stringify(JSONArr));
      if (
        modifiedConfig.errDestiantionPath &&
        modifiedConfig.shouldCaptureErrorData
      ) {
        errorDestination = fs.createWriteStream(
          modifiedConfig.errDestiantionPath
        );
        errorDestination.write(JSON.stringify(errJSONArr));
      }
    });
};

module.exports = csvtojson;
