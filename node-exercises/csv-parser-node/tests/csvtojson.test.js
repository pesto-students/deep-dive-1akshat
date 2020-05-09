const csvtojson = require("../src/csvtojson");
const fs = require("fs");
const FILE_PATH = __dirname+'/data/test.csv';
const destFilePath = __dirname+'/data/test.json';

beforeAll(async () => {
  await csvtojson(FILE_PATH, destFilePath);
});
describe("csvtojson", () => {
  test("should be a function", () => {
    expect(typeof csvtojson).toBe("function");
  });

  test("should check passed arguments type", () => {
    expect(() => csvtojson(FILE_PATH, "", { headers: null })).toThrow(
      TypeError
    );
    expect(() =>
      csvtojson(FILE_PATH, "", { headers: false, transformHeader: "check" })
    ).toThrow(TypeError);
    expect(() =>
      csvtojson(FILE_PATH, "", {
        headers: false,
        transformHeader: () => {},
        isSkipErrors: 1,
      })
    ).toThrow(TypeError);
  });

  test("should return json", () => {
    csvtojson(FILE_PATH, destFilePath);
  });
});
