const csvtojson = require("./csvtojson");
const fs = require("fs");

describe("csvtojson", () => {
  const FILE_PATH = __dirname + "/files/test.csv";
  const destFilePath = __dirname + "/files/test.json"
  test("should be a function", () => {
    expect(typeof csvtojson).toBe("function");
  });

  test("should check passed arguments type", () => {
    expect(() => csvtojson(FILE_PATH, '', {headers: null})).toThrow(TypeError);
    expect(() => csvtojson(FILE_PATH, '', {headers: false, transformHeader: 'check'})).toThrow(TypeError);
    expect(() => csvtojson(FILE_PATH, '', {headers: false, transformHeader: () => {}, isSkipErrors: 1})).toThrow(TypeError);
  });

//   test('should return json', async () => {
//     csvtojson(FILE_PATH, destFilePath);
//     const src = fs.createReadStream(destFilePath, "utf8");
//     let $data = []
//     await src.on('data', async (chunk) => {
//         $data = chunk.toString();
//     })
//   })
});
