const fs = require("fs");
const { Transform } = require("stream");
const DELIMETERS = require('./consts');

const csvtojson = (srcFilePath, destinationFilePath) => {
  const src = fs.createReadStream(srcFilePath, "utf8");
  const destination = fs.createWriteStream(destinationFilePath);

  //TODO use delimeters array to split the chunk
  const transformToJSON = new Transform({
    transform: function (chunk, _, cb) {
      const data = chunk.toString().split(/\r?\n/);
      const header = data.splice(0, 1)[0].split(",");
      const JSONArr = [];
      for (let item of data) {
        const JSONobject = {};
        const splittedItem = item.split(",");
        for (let [id, key] of header.entries()) {
          JSONobject[key] = splittedItem[id];
        }
        JSONArr.push(JSONobject);
      }
      cb(null, JSON.stringify(JSONArr));
    },
  });

  src.pipe(transformToJSON).pipe(destination);
};

module.exports = csvtojson;
